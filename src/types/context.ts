import { LoggedInUser } from "src/types/auth";

export interface AuthContextType {
  loggedUser: LoggedInUser | null;
  isAuthInitialized: boolean;
  handleGoogleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
  checkOwnership: (ownerUserID: string) => boolean;
  isAdmin: boolean;
}
