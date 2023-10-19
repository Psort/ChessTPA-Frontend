import { Routes, Route } from "react-router-dom";
import {HomePage} from "../page/home/HomePage";
import {LoginPage} from "../page/login/LoginPage";
import {SetContainer} from "../components/SetContainer";
import {SignupPage} from "../page/signup/SignupPage";
import {GamePage} from "../page/game/GamePage";
export const AppRouter = ()=>{
    return(
        <Routes>
            <Route element={<SetContainer/>}>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/game" element={<GamePage/>}></Route>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/signup" element={<SignupPage/>}></Route>
            </Route>
        </Routes>
    )
}