
import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import {GameContext} from "../../context/GameContext";
import {EMAIL} from "../../constants/constants";

export const NoLoginProtectedRoute = ({ children }: React.PropsWithChildren) => {
    if (!localStorage.getItem(EMAIL)) {
        return <Navigate to={"/login"} replace />;
    }
    return <>{children}</>;
};
