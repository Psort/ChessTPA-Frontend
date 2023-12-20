import React, {createContext, useCallback, useContext, useEffect, useState} from "react";

import {UserContextType} from "../model/context/UserContextType";

import {UserApi} from "../api/UserApi";
import {User} from "../model/User";
import {ACCESS_TOKEN, EMAIL, REFRESH_TOKEN} from "../constants/constants";
import {useNavigate} from "react-router-dom";
import {GameContext} from "./GameContext";

const defaultSettings: UserContextType = {
    currentUser: null,
    userModifier: (user: User | null) => {},
    logout: () => {},
    triggerModifier: () => {}
};

export const UserContext = createContext<UserContextType>(defaultSettings);

export const UserContextProvider = ({ children }: React.PropsWithChildren) => {
    const navigate = useNavigate();
    const gameContext = useContext(GameContext)
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

    function logout() {
        localStorage.removeItem(EMAIL);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        userModifier(null);
        gameContext.gameModifier(null)
        navigate("/")
        console.log("siema")
    }

    return (
    <UserContext.Provider value={{ logout, currentUser, userModifier, triggerModifier}}>
      {children}
    </UserContext.Provider>
  );
};


