import { Routes, Route } from "react-router-dom";
import {HomePage} from "../page/HomePage";
import {LoginPage} from "../page/LoginPage";
import {SetContainer} from "../components/SetContainer";
import {SignupPage} from "../page/SignupPage";
import {GamePage} from "../page/GamePage";
import {GameProtectedRoute} from "../components/protection/GameProtectedRoute";
import {ProfilePage} from "../page/ProfilePage";
import {NoLoginProtectedRoute} from "../components/protection/NoLoginProtectedRoute";
import {LoginProtectedRoute} from "../components/protection/LoginProtectedRoute";
import React from "react";
import {ListGamePage} from "../page/ListGamePage";
export const AppRouter = ()=>{
    return(
        <Routes>
            <Route element={<SetContainer/>}>
                <Route path="/" element={<GameProtectedRoute><HomePage/></GameProtectedRoute>}></Route>
                <Route path="/play/online" element={<ListGamePage />}></Route>
                <Route path="/play/online/:gameId" element={<GamePage />}></Route>
                <Route path="/login" element={<LoginProtectedRoute><LoginPage/></LoginProtectedRoute>}></Route>
                <Route path="/profile" element={<NoLoginProtectedRoute><ProfilePage/></NoLoginProtectedRoute>}></Route>
                <Route path="/signup" element={<LoginProtectedRoute><SignupPage/></LoginProtectedRoute>}></Route>
            </Route>
        </Routes>
    )
}