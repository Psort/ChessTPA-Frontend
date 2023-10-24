import React, {createContext, useState} from "react";
import {GameContextType} from "../model/context/GameContextType";
import {PieceModel} from "../model/pieces/PieceModel";

const defaultSetting: GameContextType = {
    currentPiece: null,
    currentPieceModifier: (piece: PieceModel | null) => {},
}

export const GameContext = createContext<GameContextType>(defaultSetting)

export const GameContextProvider = ({ children }: React.PropsWithChildren) => {
    const [currentPiece, setCurrentPiece] = useState<PieceModel | null>(null);

    const currentPieceModifier = (piece:PieceModel | null) => {
        setCurrentPiece(piece);
    }

    return (
        <GameContext.Provider value={{currentPiece, currentPieceModifier}}> {children} </GameContext.Provider>
    )
}