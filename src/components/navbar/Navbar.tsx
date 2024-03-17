
import React, {useContext} from "react";
import {LoginButton, Logo, NavContainer, RegisterButton} from "./Navbar.styles";
import {useNavigate} from "react-router-dom";
import {ACCESS_TOKEN, EMAIL, REFRESH_TOKEN} from "../../constants/constants";
import {UserContext} from "../../context/UserContext";
import tpatest from "../../resources/Img/LOGOTPA2.jpg"

export const Navbar = () =>{
    const navigate = useNavigate();
    const userContext = useContext(UserContext)

    const logout = () => {
       userContext.logout()
    }
    return(
        <NavContainer>
            <Logo src={tpatest}/>
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