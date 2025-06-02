import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut as firebaseSignOut, // Renamed to avoid conflict
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig'; // Adjust path if necessary
// Remove initialUsers import if it's no longer the source of truth for auth
// import { initialUsers } from '../data/mockData';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // The static 'users' array might still be useful for UI elements (e.g., dropdowns)
  // but authentication will rely on Firebase.
  // For a fully dynamic user list, you'd fetch this from Firestore as well.
  const [users, setUsers] = useState([]); // Or fetch from Firestore if needed

  useEffect(() => {
    // Example: Fetch initial users list from mock data or Firestore if needed for UI
    // For now, let's assume you might still want a static list for some purposes.
    // import { initialUsers } from '../data/mockData'; // If you still need it
    // setUsers(initialUsers);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setCurrentUser({ uid: user.uid, email: user.email, ...userDocSnap.data() });
        } else {
          // This case might happen if a user is in Firebase Auth but not Firestore
          // Or if it's a new registration and Firestore doc creation is pending/failed
          console.warn("User document not found in Firestore for UID:", user.uid);
          // Fallback or handle as an error. For now, set basic info.
          setCurrentUser({ uid: user.uid, email: user.email, role: 'user' }); // Default role
        }
      } else {
        // User is signed out
        setCurrentUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will handle setting currentUser with role from Firestore
      setLoading(false);
      return userCredential.user;
    } catch (error) {
      setLoading(false);
      console.error("Error signing in:", error.code, error.message);
      throw error; // Re-throw to handle in UI
    }
  };

  // The concepts of loginAsAdmin and loginAsUser change with Firebase.
  // Login is generic, and the role is determined from Firestore.
  // If you need specific admin login logic (e.g. different endpoint or checks),
  // you would implement that here. For now, it's a wrapper around the general login.

  const loginAsAdmin = async (email, password) => {
    // Potentially add admin-specific checks here if needed before or after login
    // For now, it's the same as the general login. The role check happens in onAuthStateChanged.
    return login(email, password);
  };

  const loginAsUser = async (email, password) => {
    // This is essentially the same as the general login.
    // The original loginAsUser(userId) is not applicable with Firebase email/password auth.
    return login(email, password);
  };

  const register = async (email, password, name, role = 'user') => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
        role: role, // 'admin' or 'user'
        createdAt: new Date().toISOString(),
      });
      // onAuthStateChanged will set the currentUser, including the new Firestore data
      setLoading(false);
      return user;
    } catch (error) {
      setLoading(false);
      console.error("Error registering user:", error.code, error.message);
      throw error; // Re-throw to handle in UI
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      // onAuthStateChanged will set currentUser to null
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return {
    currentUser,
    loading,
    login, // Generic login
    loginAsAdmin, // Specific admin login (if different logic is needed)
    loginAsUser,  // Specific user login (if different logic is needed)
    register,
    logout,
    users, // This is the static list, consider fetching from Firestore if needed dynamically
  };
};