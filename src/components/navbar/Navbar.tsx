
import React from "react";
import {LoginButton, Logo, NavContainer, RegisterButton} from "./Navbar.styles";
import {useNavigate} from "react-router-dom";

export const Navbar = () =>{
    const navigate = useNavigate();
    return(
        <NavContainer>
            <Logo/>
            <RegisterButton onClick={()=>navigate("/game")}>
                Play
            </RegisterButton>
            <RegisterButton onClick={()=>navigate("/signup")}>
                Sign Up
            </RegisterButton>
            <LoginButton onClick={()=>navigate("/login")}>
                Log in
            </LoginButton>

        </NavContainer>
    )
}