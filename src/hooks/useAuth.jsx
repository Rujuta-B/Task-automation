// src/hooks/useAuth.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig'; // adjust path if needed

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch additional user data from Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            // Combine Auth user data with Firestore data
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              ...userDocSnap.data() // This will include the role
            });
            console.log('User data loaded:', {
              uid: user.uid,
              email: user.email,
              ...userDocSnap.data()
            });
          } else {
            console.log('No Firestore document for user:', user.uid);
            // Set default role if no document exists
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              role: 'user' // Default role
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // The useEffect above will handle setting the user with role
      return userCredential;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => signOut(auth);

  const value = {
    currentUser,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
