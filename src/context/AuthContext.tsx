import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../utils/firebaseConfig";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

type AuthContextProps = {
  user: User | null;
  userSignUp: (email: string, password: string) => Promise<UserCredential>;
  userLogin: (email: string, password: string) => Promise<UserCredential>;
  handleErrors(setter: (msg: string) => void, code: string): void;
  userLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext can only be used inside AuthProvider");
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const userSignUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userLogout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authState) => {
      setUser(authState);
      setLoadingUser(false);
    });

    return unsubscribe;
  }, []);

  function handleErrors(setter: (msg: string) => void, code: string) {
    switch (code) {
      case "auth/email-already-exists":
        setter("Email already exist.");
        break;
      case "auth/email-already-in-use":
        setter("Email already exist.");
        break;
      case "auth/invalid-email":
        setter("Invalid email.");
        break;
      case "auth/user-not-found":
        setter("User not found.");
        break;
      case "auth/invalid-login-credentials":
        setter("Email or password are incorrect.");
        break;

      default:
        setter("There was something wrong.");
        break;
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, userSignUp, userLogin, userLogout, handleErrors }}
    >
      {!loadingUser && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
