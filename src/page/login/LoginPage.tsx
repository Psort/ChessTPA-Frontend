import {AuthApi} from "../../api/AuthApi";
import {useCallback, useEffect} from "react";
import {Section} from "../../App.styles";
import {LoginForm} from "../../components/loginform/LoginForm";

export const LoginPage = () =>{
    return(
        <Section>
            <LoginForm/>
        </Section>
    )
}