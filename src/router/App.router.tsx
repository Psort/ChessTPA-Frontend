import { Routes, Route } from "react-router-dom";
import {HomePage} from "../page/home/HomePage";
import {LoginPage} from "../page/login/LoginPage";
import {SetContainer} from "../components/SetContainer";
import {SignupPage} from "../page/signup/SignupPage";
import {GamePage} from "../page/game/GamePage";
import {GameProtectedRoute} from "../components/protection/GameProtectedRoute";
export const AppRouter = ()=>{
    return(
        <Routes>
            <Route element={<SetContainer/>}>
                <Route path="/" element={<GameProtectedRoute><HomePage/></GameProtectedRoute>}></Route>
                <Route path="/game/online/:gameId" element={<GamePage />}></Route>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/signup" element={<SignupPage/>}></Route>
            </Route>
        </Routes>
    )
}