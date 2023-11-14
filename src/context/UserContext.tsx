import React, {createContext, useCallback, useContext, useEffect, useState} from "react";

import {UserContextType} from "../model/context/UserContextType";

import {UserApi} from "../api/UserApi";
import {User} from "../model/User";
import {EMAIL} from "../constants/constants";

const defaultSettings: UserContextType = {
    currentUser: null,
    userModifier: (user: User | null) => {},
    triggerModifier: () => {}
};

export const UserContext = createContext<UserContextType>(defaultSettings);

export const UserContextProvider = ({ children }: React.PropsWithChildren) => {
  const [trigger, setTrigger] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const userModifier = (user: User | null) => {
    setCurrentUser(user);
  };
  const triggerModifier = () => {
          setTrigger(!trigger)
  }
    const fetchUserByEmail = useCallback(async () => {
        try {
            const user = await UserApi.getUser(localStorage.getItem(EMAIL))
            userModifier(user.data)
        } catch (error: any) {
            console.log(error)
        }
    }, [])


    useEffect(() => {
        const email = localStorage.getItem(EMAIL)
        if(email && !currentUser){
            fetchUserByEmail()
        }
    }, [trigger])
    // async function fetchUserByEmail(email: string) {
    //     try {
    //         console.log("here")
    //         const user = await UserApi.getUser(email)
    //         userModifier(user.data)
    //     } catch (error: any) {
    //         console.log(error)
    //     }
    // }

    return (
    <UserContext.Provider value={{ currentUser, userModifier, triggerModifier}}>
      {children}
    </UserContext.Provider>
  );
};


