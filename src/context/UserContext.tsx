import React, {createContext, useCallback, useContext, useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {UserContextType} from "../model/context/UserContextType";
import {User} from "../model/User";
import {GameContext} from "./GameContext";

const defaultSettings: UserContextType = {
  currentUser: null,
  userModifier: (user: User | null) => {},
};

export const UserContext = createContext<UserContextType>(defaultSettings);

export const UserContextProvider = ({ children }: React.PropsWithChildren) => {
  const context = useContext(GameContext)
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const userModifier = (user: User | null) => {
    setCurrentUser(user);
  };

  const fetchUser = useCallback(async () => {
    try {
      // const token = await AuthApi.refreshToken({
      //    refreshToken:localStorage.getItem(REFRESH_TOKEN)
      //     });
      // localStorage.setItem(ACCESS_TOKEN,token.data.access_token)
      // localStorage.setItem(REFRESH_TOKEN,token.data.refresh_token)
    }catch (error){
      toast.error("Bład serwera")
    }

  }, []);

  return (
    <UserContext.Provider value={{ currentUser, userModifier }}>
      {children}
    </UserContext.Provider>
  );
};


