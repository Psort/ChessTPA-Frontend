import React, {useCallback, useState} from "react";
import {
    ForgotPassword,
    FormInput,
    FormWrapper,
    LoginContainer, SubmitButton,
    WelcomeLine1,
    WelcomeLine2,
    WelcomeLines
} from "./LoginForm.styles";
import {AuthApi} from "../../api/AuthApi";
import {ACCESS_TOKEN} from "../../constants/constants";


export const LoginForm = () =>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const onLoginClicked = useCallback(async () => {
        try {
            const user = await AuthApi.login({
                email: email,
                password: password,
            });
            localStorage.setItem("ACCESS_TOKEN",user.data.access_token)
        } catch (error: any) {
            let errorMessage;
            console.log(errorMessage)
        }
    }, [email,password]);
    return(
        <LoginContainer>
            <FormWrapper>
                    <WelcomeLines>
                        <WelcomeLine1>Chess</WelcomeLine1>
                        <WelcomeLine2>Wanna Play?</WelcomeLine2>
                    </WelcomeLines>
                    <FormInput >
                        <input onChange={(event) => setEmail(event.target.value)} placeholder="Email Address" type="text" />
                    </FormInput>
                    <FormInput>
                        <input onChange={(event) => setPassword(event.target.value)} placeholder="Password" type="password" />
                    </FormInput>
                    <SubmitButton onClick={onLoginClicked}>
                        Login
                    </SubmitButton>
                    <ForgotPassword>
                        <a href="#">Forgot password?</a>
                    </ForgotPassword>
            </FormWrapper>
        </LoginContainer>
    )
}