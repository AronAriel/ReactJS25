import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

interface AuthContextType {
  user: User | null;
  userEmail: string;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("Пользователь авторизован:", currentUser.email);
        setUser(currentUser);
        setUserEmail(currentUser.email ?? "");
      } else {
        console.log("Пользователь не авторизован");
        setUser(null);
        setUserEmail("");
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async (): Promise<void> => {
    await signOut(auth);
    setUser(null);
    setUserEmail("");
  };

  return (
    <AuthContext.Provider value={{ user, userEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
