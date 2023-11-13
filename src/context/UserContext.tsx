import React, {createContext, useCallback, useContext, useEffect, useState} from "react";

import {UserContextType} from "../model/context/UserContextType";

import {UserApi} from "../api/UserApi";
import {User} from "../model/User";

const defaultSettings: UserContextType = {
    currentUser: null,
    userModifier: (user: User | null) => {},
    provideUsername: (email: string) => {}
};

export const UserContext = createContext<UserContextType>(defaultSettings);

export const UserContextProvider = ({ children }: React.PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const userModifier = (user: User | null) => {
    setCurrentUser(user);
  };

    const provideUsername = useCallback(async (email: string) => {
        try {
            const user = await UserApi.getUsername(email)
            userModifier(user.data)
        } catch (error: any) {
            console.log(error)
        }
    }, [])

  return (
    <UserContext.Provider value={{ currentUser, userModifier, provideUsername}}>
      {children}
    </UserContext.Provider>
  );
};


