import React, {createContext, useCallback, useEffect, useState} from "react";
import {GameContextType} from "../model/context/GameContextType";
import {PieceModel} from "../model/pieces/PieceModel";
import {deafoultPiecesSetUp} from "../model/pieces/DeafoultPiecesSetUp";
import {Coordinate} from "../model/api/game/Coordinate";


const defaultSetting: GameContextType = {
    promoteX:0,
    colorTurn:"white",
    colorTurnModifier: (color: string) => {},
    pieces:deafoultPiecesSetUp,
    piecesModifier: (pieces: PieceModel[]) => {},
    currentPiece: null,
    currentPieceModifier: (piece: PieceModel | null) => {},
    possibleMoves:null,
    possibleMovesModifier:(moves:Coordinate[]|null) => {},
}

export const GameContext = createContext<GameContextType>(defaultSetting)

export const GameContextProvider = ({ children }: React.PropsWithChildren) => {
    const [promoteX,setPromoteX] = useState<number>(0)
    const [colorTurn,setColorTurn] = useState("white")
    const [pieces ,setPieces] = useState<PieceModel[]>(deafoultPiecesSetUp)
    const [currentPiece, setCurrentPiece] = useState<PieceModel | null>(null);
    const [possibleMoves,setPossibleMoves] = useState<Coordinate[]|null>(null)
    const currentPieceModifier = (piece:PieceModel | null) => {
        setCurrentPiece(piece);
    }
    const possibleMovesModifier = (possibleMoves:Coordinate[]|null) => {
        setPossibleMoves(possibleMoves);
    }

    function piecesModifier(pieces: PieceModel[] ) {
        setPieces(pieces)
    }
    useEffect(() => {
        setPromoteX(currentPiece?.color != "white" ? 8 : 1)
    }, [currentPiece]);

    function colorTurnModifier(color:string) {
        setColorTurn(color)
    }

    return (
        <GameContext.Provider value={{promoteX,colorTurn,colorTurnModifier,possibleMoves,possibleMovesModifier,pieces,piecesModifier,currentPiece, currentPieceModifier}}> {children} </GameContext.Provider>
    )
}