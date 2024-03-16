import {Section} from "../App.styles";
import React, {useContext} from "react";
import {UserContext} from "../context/UserContext";


export const ProfilePage = () => {
    const userContext = useContext(UserContext)
    return(
        <Section>
            <div>
                <div>
                    <strong>Username:</strong> {userContext.currentUser?.username}
                </div>
                <div>
                    <strong>Elo Rating:</strong> {userContext.currentUser?.eloRating}
                </div>
            </div>
        </Section>
    )
}