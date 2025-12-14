"use client";

import { createContext, useContext, useEffect, useState } from "react";
import  { userSessionInterface } from "../types/userSession";

interface AuthContextProps {
  dataUser: userSessionInterface | null;
  setDataUser: (dataUser: userSessionInterface | null) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextProps>({
    dataUser: null,
    setDataUser: () => {},
    logout: () => {},
});

interface AuthProviderProps {
    children: React.ReactElement;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [dataUser, setDataUser] = useState<userSessionInterface | null>(null);

  useEffect(() => {
    console.log("dataUser CHANGED →", dataUser);
    if(dataUser){
        localStorage.setItem('userSession', JSON.stringify(dataUser))
    }
  }, [dataUser]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const dataFormLocalStorage = localStorage.getItem("userSession");
        if (dataFormLocalStorage) {
            setDataUser(JSON.parse(dataFormLocalStorage));
        }
    }
  }, []);

  const logout = () => {
    setDataUser(null);
    localStorage.removeItem("userSession");
  };
  return(
    <AuthContext.Provider value={{dataUser, setDataUser, logout}}>
        {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => useContext(AuthContext);