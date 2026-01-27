import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";

import { auth, googleProvider } from "src/api/firebase";
import { LoggedInUser } from "src/types/auth";
import { URLS } from "src/constants/urls";

interface AuthContextType {
  loggedUser: LoggedInUser | null;
  handleGoogleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mapFirebaseUser = (firebaseUser: User | null): LoggedInUser | null => {
  if (!firebaseUser) return null;
  return {
    userID: firebaseUser.uid,
    displayName: firebaseUser.displayName,
    email: firebaseUser.email,
    photoURL: firebaseUser.photoURL,
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState<LoggedInUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setLoggedUser(mapFirebaseUser(firebaseUser));
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = React.useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setLoggedUser(mapFirebaseUser(result.user));
      navigate(URLS.HOME);
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  }, []);

  const handleLogout = React.useCallback(async () => {
    try {
      await signOut(auth);
      setLoggedUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, []);

  const contextValue = React.useMemo(
    () => ({ loggedUser, handleGoogleLogin, handleLogout }),
    [loggedUser, handleGoogleLogin, handleLogout],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
