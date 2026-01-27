import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { auth, googleProvider } from "src/api/firebase";
import { LoggedInUser } from "src/types/auth";

const useAuth = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState<LoggedInUser | null>(null);

  const signInWithGooglePopup = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  };

  const logout = async () => {
    await signOut(auth);
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithGooglePopup();
      const mappedUser = mapFirebaseUser(userCredential);
      setLoggedUser(mappedUser);
      navigate("/");
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setLoggedUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const mapFirebaseUser = (firebaseUser: User | null): LoggedInUser | null => {
    if (!firebaseUser) return null;
    return {
      userID: firebaseUser.uid,
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      photoURL: firebaseUser.photoURL,
    };
  };

  // listen to firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const loggedUser = mapFirebaseUser(firebaseUser);

      setLoggedUser(loggedUser);
    });

    return () => unsubscribe();
  }, []);

  return {
    signInWithGooglePopup,
    logout,
    handleGoogleLogin,
    handleLogout,
    loggedUser,
  };
};

export default useAuth;
