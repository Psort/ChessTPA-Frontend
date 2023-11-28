
import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import {GameContext} from "../../context/GameContext";
import {EMAIL} from "../../constants/constants";

export const LoginProtectedRoute = ({ children }: React.PropsWithChildren) => {
    if (localStorage.getItem(EMAIL)) {
        return <Navigate to={"/profile"} replace />;
    }
    return <>{children}</>;
};
