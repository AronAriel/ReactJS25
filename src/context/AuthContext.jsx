import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(""); 

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      console.log("Пользователь авторизован:", currentUser.email);
      setUser(currentUser);
      setUserEmail(currentUser.email);
    } else {
      console.log("Пользователь не авторизован");
      setUser(null);
      setUserEmail("");
    }
  });

  return () => unsubscribe();
}, []);


  const logout = async () => {
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


export const useAuth = () => useContext(AuthContext);
