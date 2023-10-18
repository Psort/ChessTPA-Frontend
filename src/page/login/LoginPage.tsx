import {AuthApi} from "../../api/AuthApi";
import {useCallback, useEffect} from "react";
import {Section} from "../../App.styles";
import {LoginForm} from "../../components/loginform/LoginForm";
import {BackgroundWrapper} from "../../components/loginform/LoginForm.styles";


export const LoginPage = () =>{
    return(
        <Section>
            <BackgroundWrapper />
            <LoginForm/>
        </Section>
    )
}