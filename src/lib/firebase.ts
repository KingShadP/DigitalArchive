import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, User, signInWithPopup } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      cachedAccessToken = await user.getIdToken();
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string }> => {
  const result = await signInWithPopup(auth, googleAuthProvider);
  cachedAccessToken = await result.user.getIdToken();
  return { user: result.user, accessToken: cachedAccessToken };
};

export const getAccessToken = async (): Promise<string | null> => {
  if (!cachedAccessToken && auth.currentUser) {
    cachedAccessToken = await auth.currentUser.getIdToken();
  }
  return cachedAccessToken;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};
