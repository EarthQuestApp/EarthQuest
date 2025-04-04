// useAuthState.js
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig"; // Path to your firebaseConfig.js

const useAuthState = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);  // Set user if logged in, or null if logged out
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  return user; // Return the current user object or null
};

export default useAuthState;
