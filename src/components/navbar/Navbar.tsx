
import React, {useContext} from "react";
import {LoginButton, Logo, NavContainer, RegisterButton} from "./Navbar.styles";
import {useNavigate} from "react-router-dom";
import {EMAIL} from "../../constants/constants";
import {UserContext} from "../../context/UserContext";

export const Navbar = () =>{
    const navigate = useNavigate();
    const userContext = useContext(UserContext)

    const logut = () => {
        localStorage.removeItem(EMAIL);
        userContext.userModifier(null);
        navigate("/")
    }
    return(
        <NavContainer>
            <Logo/>
            <RegisterButton onClick={()=>navigate("/")}>
                Play
            </RegisterButton>
            <RegisterButton onClick={()=>navigate("/signup")}>
                Sign Up
            </RegisterButton>
            <LoginButton onClick={()=>navigate("/login")}>
                Log in
            </LoginButton>
            <LoginButton onClick={() => logut()
            }>
                Log out
            </LoginButton>
        </NavContainer>
    )
}