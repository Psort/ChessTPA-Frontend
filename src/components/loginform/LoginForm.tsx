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
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../constants/constants";
import {toast} from "react-toastify";

export const LoginForm = () =>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const onLoginClicked = useCallback(async () => {
        try {
            const user = await AuthApi.login({
                username: username,
                password: password,
            });
            localStorage.setItem(ACCESS_TOKEN,user.data.access_token)
            localStorage.setItem(REFRESH_TOKEN,user.data.refresh_token)
            toast.info("done")
        } catch (error: any) {
            console.log(error)
        }
    }, [username,password]);

    return(
        <LoginContainer>
            <FormWrapper>
                    <WelcomeLines>
                        <WelcomeLine1>Chess</WelcomeLine1>
                        <WelcomeLine2>Wanna Play?</WelcomeLine2>
                    </WelcomeLines>
                    <FormInput >
                        <input onChange={(event) => setUsername(event.target.value)} placeholder="Username" type="text" />
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