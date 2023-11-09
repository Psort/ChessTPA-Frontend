
import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import {GameContext} from "../../context/GameContext";

export const GameProtectedRoute = ({ children }: React.PropsWithChildren) => {
    const gameContext = useContext(GameContext);
    console.log(gameContext.id)
    if (gameContext.id) {
        return <Navigate to={"/game/online"} replace />;
    }
    return <>{children}</>;
};
