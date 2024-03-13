import React, {useCallback, useState} from "react";
import {AuthApi} from "../../api/AuthApi";
import {
    ForgotPassword,
    FormInput,
    FormWrapper,
    LoginContainer, SubmitButton,
    WelcomeLine1,
    WelcomeLine2,
    WelcomeLines
} from "../loginform/LoginForm.styles";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export const SignupForm = () => {
    const navigate = useNavigate();
    const [username ,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const submitSignup = useCallback(async () => {
        try {
            const response = await AuthApi.signIn({
                username: username,
                email: email,
                password: password,
            });
            console.log(response.data)
            navigate("/login")
            toast.info("done")
        } catch (error: any) {
            toast.error("Error during register, please try again in few moments.")
            console.log(error.response)
        }

    }, [username,email,password]);
    return(
        <LoginContainer>
            <FormWrapper>
                <WelcomeLines>
                    <WelcomeLine1>Chess</WelcomeLine1>
                    <WelcomeLine2>Sign up for free</WelcomeLine2>
                </WelcomeLines>
                <FormInput >
                    <input onChange={(event) => setUsername(event.target.value)} placeholder="Username" type="text" />
                </FormInput>
                <FormInput >
                    <input onChange={(event) => setEmail(event.target.value)} placeholder="Email Address" type="text" />
                </FormInput>
                <FormInput>
                    <input onChange={(event) => setPassword(event.target.value)} placeholder="Password" type="password" />
                </FormInput>
                <SubmitButton onClick={submitSignup}>
                    Sign up
                </SubmitButton>
            </FormWrapper>
        </LoginContainer>
    )
}