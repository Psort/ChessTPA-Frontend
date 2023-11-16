import React, {createContext, useEffect, useState} from "react";
import {GameContextType} from "../model/context/GameContextType";
import {PieceModel} from "../model/pieces/PieceModel";
import {Coordinate} from "../model/api/engine/Coordinate";
import {GameResponse} from "../model/api/game/GameResponse";
import {Game} from "../model/game/Game";
import {GameState} from "../model/game/GameState";



const defaultSetting: GameContextType = {
    game:null,
    gameModifier:(game:Game|null) => {},
    actualGameState:undefined,
    promoteX:0,
    colorTurn:"white",
    colorTurnModifier: (color: string) => {},
    pieces:[],
    piecesModifier: (pieces: PieceModel[][]) => {},
    currentPiece: null,
    currentPieceModifier: (piece: PieceModel | null) => {},
    possibleMoves:null,
    possibleMovesModifier:(moves:Coordinate[]|null) => {},
}

export const GameContext = createContext<GameContextType>(defaultSetting)

export const GameContextProvider = ({ children }: React.PropsWithChildren) => {
    const [game,setGame] = useState<Game|null>(null)
    const [actualGameState,setActualGameState] = useState<GameState|undefined>()
    const [promoteX,setPromoteX] = useState<number>(0)
    const [colorTurn,setColorTurn] = useState("white")
    const [pieces ,setPieces] = useState<PieceModel[][]>([])
    const [currentPiece, setCurrentPiece] = useState<PieceModel | null>(null);
    const [possibleMoves,setPossibleMoves] = useState<Coordinate[]|null>(null)
    const currentPieceModifier = (piece:PieceModel | null) => {
        setCurrentPiece(piece);
    }
    const possibleMovesModifier = (possibleMoves:Coordinate[]|null) => {
        setPossibleMoves(possibleMoves);
    }

    function piecesModifier(pieces: PieceModel[][]) {
        setPieces(pieces)
    }
    useEffect(() => {
        setPromoteX(currentPiece?.color !== "white" ? 8 : 1)
    }, [currentPiece]);

    function colorTurnModifier(color:string) {
        setColorTurn(color)
    }

    function gameModifier(game:Game|null) {
        setGame(game)
        setActualGameState(game?.history.at(game?.history.length-1))
    }

    return (
        <GameContext.Provider value={{game,gameModifier,actualGameState,promoteX,colorTurn,colorTurnModifier,possibleMoves,possibleMovesModifier,pieces,piecesModifier,currentPiece, currentPieceModifier}}> {children} </GameContext.Provider>
    )
}