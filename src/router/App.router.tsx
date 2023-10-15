import { Routes, Route } from "react-router-dom";
import {HomePage} from "../page/home/HomePage";
import {LoginPage} from "../page/login/LoginPage";
export const AppRouter = ()=>{
    return(
        <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
        </Routes>
    )
}