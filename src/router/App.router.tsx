import { Routes, Route } from "react-router-dom";
import {HomePage} from "../page/home/HomePage";
import {LoginPage} from "../page/login/LoginPage";
import {SetContainer} from "../components/SetContainer";
export const AppRouter = ()=>{
    return(
        <Routes>
            <Route element={<SetContainer/>}>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
            </Route>
        </Routes>
    )
}