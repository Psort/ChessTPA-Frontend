
import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import {GameContext} from "../../context/GameContext";

export const GameProtectedRoute = ({ children }: React.PropsWithChildren) => {
    const gameContext = useContext(GameContext);
    if (gameContext.game?.id) {
        return <Navigate to={`/game/online/${gameContext.game.id}`} replace />;
    }
    return <>{children}</>;
};
