
import React, {useContext} from "react";
import {LoginButton, Logo, NavContainer, RegisterButton} from "./Navbar.styles";
import {useNavigate} from "react-router-dom";
import {ACCESS_TOKEN, EMAIL, REFRESH_TOKEN} from "../../constants/constants";
import {UserContext} from "../../context/UserContext";
import {GameContext} from "../../context/GameContext";

export const Navbar = () =>{
    const navigate = useNavigate();
    const userContext = useContext(UserContext)
    const gameContext = useContext(GameContext)

    const logout = () => {
        localStorage.removeItem(EMAIL);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        userContext.userModifier(null);
        gameContext.gameModifier(null)
        navigate("/")
    }
    return(
        <NavContainer>
            <Logo/>
            <RegisterButton onClick={()=>navigate("/")}>
                Play
            </RegisterButton>
            {localStorage.getItem(EMAIL) ? (
                <>
                    <RegisterButton onClick={() => navigate("/profile")}>
                        {userContext.currentUser?.username}
                    </RegisterButton>
                    <RegisterButton onClick={() => logout()}>
                        Log out
                    </RegisterButton>
                </>

            ) : (
                <>
                    <RegisterButton onClick={() => navigate("/signup")}>
                        Sign Up
                    </RegisterButton>
                    <LoginButton onClick={() => navigate("/login")}>
                        Log in
                    </LoginButton>
                </>
            )}

        </NavContainer>
    )
}