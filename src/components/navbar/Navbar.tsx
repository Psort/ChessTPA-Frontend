import {Section} from "../../App.styles";
import React from "react";
import {LoginButton, Logo, NavContainer, RegisterButton} from "./Navbar.styles";

export const Navbar = () =>{
    return(
        <NavContainer>
            <Logo/>
            <RegisterButton>
                Sign Up
            </RegisterButton>
            <LoginButton>
                Log in
            </LoginButton>

        </NavContainer>
    )
}