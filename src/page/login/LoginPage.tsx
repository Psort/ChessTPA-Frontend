import {AuthApi} from "../../api/AuthApi";
import {useCallback, useEffect} from "react";

export const LoginPage = () =>{
    const onLoginClicked = useCallback(async () => {
        try {
            const user = await AuthApi.signIn({
                username:"dds32fdsfsd13",
                email: "emai3213fsdfdsfsdf21l@gmail.com",
                password: "pas321321sword",
            });
            console.log(user)
        } catch (error: any) {
            let errorMessage;
            console.log(errorMessage)
        }
    }, []);
    useEffect(() => {
        onLoginClicked()
    }, []);
    return(
        <>
            login
        </>
    )
}