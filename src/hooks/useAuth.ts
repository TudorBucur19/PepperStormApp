import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router";

import { auth, googleProvider } from "src/api/firebase";
import { useStore } from "src/store/rootStore";

const useAuth = () => {
  const navigate = useNavigate();
  const { setLoggedUser } = useStore((state) => ({
    setLoggedUser: state.setLoggedUser,
  }));

  const signInWithGooglePopup = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  };

  const logout = async () => {
    await signOut(auth);
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGooglePopup();
      const currentUser = {
        displayName: user.displayName ?? "",
        photoURL: user.photoURL ?? "",
        userID: user.uid,
      };
      setLoggedUser(currentUser);
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

  return { signInWithGooglePopup, logout, handleGoogleLogin, handleLogout };
};

export default useAuth;
