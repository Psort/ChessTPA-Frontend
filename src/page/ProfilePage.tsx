import {Section} from "../App.styles";
import React, {useContext} from "react";
import {UserContext} from "../context/UserContext";


export const ProfilePage = () => {
    const userContext = useContext(UserContext)
    return(
        <Section>
            {/*{userContext.currentUser?.username}*/}
        </Section>
    )
}