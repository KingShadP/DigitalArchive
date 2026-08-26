'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  User,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { auth, db, googleProvider, testConnection } from '@/lib/firebase';
import { handleFirestoreError, OperationType } from '@/lib/firebase-errors';

export interface UserProfile {
  userId: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  collectorTier?: 'initiate' | 'patron' | 'archivist' | 'guardian';
}

export interface SavedArtifactItem {
  userId: string;
  artifactId: string;
  title: string;
  artifactClass?: string;
  savedAt?: any;
}

export interface FavoriteTrackItem {
  userId: string;
  trackId: string;
  releaseId: string;
  title: string;
  duration?: string;
  addedAt?: any;
}

interface FirebaseContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  savedArtifactIds: string[];
  favoriteTrackIds: string[];
  toggleSaveArtifact: (artifact: { id: string; title: string; artifactClass?: string }) => Promise<boolean>;
  toggleFavoriteTrack: (track: { id: string; releaseId: string; title: string; duration?: string }) => Promise<boolean>;
  isArtifactSaved: (artifactId: string) => boolean;
  isTrackFavorited: (trackId: string) => boolean;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedArtifactIds, setSavedArtifactIds] = useState<string[]>([]);
  const [favoriteTrackIds, setFavoriteTrackIds] = useState<string[]>([]);

  // Test connection on boot
  useEffect(() => {
    testConnection();
  }, []);

  // Listen to Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Sync or initialize user profile in Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        const path = `users/${currentUser.uid}`;
        try {
          const snapshot = await getDoc(userDocRef);
          if (!snapshot.exists()) {
            const initialProfile = {
              userId: currentUser.uid,
              email: currentUser.email || 'collector@kingshadp.digital',
              displayName: currentUser.displayName || 'Collector',
              photoURL: currentUser.photoURL || '',
              collectorTier: 'initiate',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            };
            await setDoc(userDocRef, initialProfile);
            setProfile({
              userId: currentUser.uid,
              email: initialProfile.email,
              displayName: initialProfile.displayName,
              photoURL: initialProfile.photoURL,
              collectorTier: 'initiate',
            });
          } else {
            const data = snapshot.data();
            setProfile({
              userId: currentUser.uid,
              email: data.email || currentUser.email || '',
              displayName: data.displayName || currentUser.displayName || '',
              photoURL: data.photoURL || currentUser.photoURL || '',
              collectorTier: data.collectorTier || 'initiate',
            });
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, path);
        }
      } else {
        setProfile(null);
        setSavedArtifactIds([]);
        setFavoriteTrackIds([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Listen to Saved Artifacts
  useEffect(() => {
    if (!user) return;
    const path = `users/${user.uid}/saved_artifacts`;
    const savedRef = collection(db, 'users', user.uid, 'saved_artifacts');

    const unsubscribe = onSnapshot(
      savedRef,
      (snapshot) => {
        const ids = snapshot.docs.map((docSnap) => docSnap.id);
        setSavedArtifactIds(ids);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Listen to Favorite Tracks
  useEffect(() => {
    if (!user) return;
    const path = `users/${user.uid}/favorite_tracks`;
    const favRef = collection(db, 'users', user.uid, 'favorite_tracks');

    const unsubscribe = onSnapshot(
      favRef,
      (snapshot) => {
        const ids = snapshot.docs.map((docSnap) => docSnap.id);
        setFavoriteTrackIds(ids);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const signInWithGoogle = useCallback(async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Sign-in error:', error);
      throw error;
    }
  }, []);

  const signOutUser = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign-out error:', error);
      throw error;
    }
  }, []);

  const toggleSaveArtifact = useCallback(
    async (artifact: { id: string; title: string; artifactClass?: string }): Promise<boolean> => {
      if (!user) {
        await signInWithGoogle();
        return false;
      }
      const isSaved = savedArtifactIds.includes(artifact.id);
      const docPath = `users/${user.uid}/saved_artifacts/${artifact.id}`;
      const docRef = doc(db, 'users', user.uid, 'saved_artifacts', artifact.id);

      try {
        if (isSaved) {
          await deleteDoc(docRef);
          return false;
        } else {
          await setDoc(docRef, {
            userId: user.uid,
            artifactId: artifact.id,
            title: artifact.title,
            artifactClass: artifact.artifactClass || 'Archive item',
            savedAt: serverTimestamp(),
          });
          return true;
        }
      } catch (error) {
        handleFirestoreError(error, isSaved ? OperationType.DELETE : OperationType.WRITE, docPath);
      }
    },
    [user, savedArtifactIds, signInWithGoogle]
  );

  const toggleFavoriteTrack = useCallback(
    async (track: { id: string; releaseId: string; title: string; duration?: string }): Promise<boolean> => {
      if (!user) {
        await signInWithGoogle();
        return false;
      }
      const isFav = favoriteTrackIds.includes(track.id);
      const docPath = `users/${user.uid}/favorite_tracks/${track.id}`;
      const docRef = doc(db, 'users', user.uid, 'favorite_tracks', track.id);

      try {
        if (isFav) {
          await deleteDoc(docRef);
          return false;
        } else {
          await setDoc(docRef, {
            userId: user.uid,
            trackId: track.id,
            releaseId: track.releaseId,
            title: track.title,
            duration: track.duration || '00:00',
            addedAt: serverTimestamp(),
          });
          return true;
        }
      } catch (error) {
        handleFirestoreError(error, isFav ? OperationType.DELETE : OperationType.WRITE, docPath);
      }
    },
    [user, favoriteTrackIds, signInWithGoogle]
  );

  const isArtifactSaved = useCallback(
    (artifactId: string) => savedArtifactIds.includes(artifactId),
    [savedArtifactIds]
  );

  const isTrackFavorited = useCallback(
    (trackId: string) => favoriteTrackIds.includes(trackId),
    [favoriteTrackIds]
  );

  return (
    <FirebaseContext.Provider
      value={{
        user,
        profile,
        isLoading,
        signInWithGoogle,
        signOutUser,
        savedArtifactIds,
        favoriteTrackIds,
        toggleSaveArtifact,
        toggleFavoriteTrack,
        isArtifactSaved,
        isTrackFavorited,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}
