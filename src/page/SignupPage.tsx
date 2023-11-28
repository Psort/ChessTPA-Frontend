import {Section} from "../App.styles";
import {SignupForm} from "../components/signupform/SignupForm";
import {BackgroundWrapper} from "../components/loginform/LoginForm.styles";

export const SignupPage = () =>{
    return(
        <Section>
            <BackgroundWrapper />
            <SignupForm/>
        </Section>
    )
}