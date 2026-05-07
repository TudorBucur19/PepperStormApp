import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import { AuthContextType } from "src/types/context";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type E2EWindow = Window & {
  __E2E_AUTH_USER__?: LoggedInUser | null;
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState<LoggedInUser | null>(null);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  useEffect(() => {
    const e2eUser = (window as E2EWindow).__E2E_AUTH_USER__;
    if (e2eUser !== undefined) {
      setLoggedUser(e2eUser);
      setIsAuthInitialized(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setLoggedUser(mapFirebaseUser(firebaseUser));
      setIsAuthInitialized(true);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setLoggedUser(mapFirebaseUser(result.user));
      navigate(URLS.HOME);
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      setLoggedUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, []);

  const isAdmin = loggedUser?.userID === "tOkQZxEnP6htFGgp6KXEHTBySBR2";
  const checkOwnership = useCallback(
    (ownerUserID: string) => {
      return loggedUser?.userID === ownerUserID || isAdmin;
    },
    [loggedUser, isAdmin],
  );

  const contextValue = useMemo(
    () => ({
      loggedUser,
      isAuthInitialized,
      handleGoogleLogin,
      handleLogout,
      isAdmin,
      checkOwnership,
    }),
    [
      loggedUser,
      isAuthInitialized,
      handleGoogleLogin,
      handleLogout,
      isAdmin,
      checkOwnership,
    ],
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
