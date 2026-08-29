import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '../lib/firebase-admin';
import { getOrCreateUser } from '../db/users';

export async function requireAuth(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { user: null, error: 'Unauthorized: Missing token', status: 401 };
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    // Auto-sync user to db
    const email = decodedToken.email || 'unknown@example.com';
    const dbUser = await getOrCreateUser(decodedToken.uid, email);
    
    return { user: decodedToken, dbUser, error: null };
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    return { user: null, error: 'Unauthorized: Invalid token', status: 401 };
  }
}
