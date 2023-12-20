import React, {createContext, useContext, useEffect, useState} from "react";
import {GameContextType} from "../model/context/GameContextType";
import {PieceModel} from "../model/pieces/PieceModel";
import {Coordinate} from "../model/api/engine/Coordinate";
import {Game} from "../model/game/Game";
import {GameState} from "../model/game/GameState";
import {UserContext} from "./UserContext";
import {ColorType} from "../model/game/ColorType";
import {boardStateToBoard} from "../utils/GameContextUtils";


const defaultSetting: GameContextType = {
    blockAction:false,
    blockActionModifier:(blockAction:boolean)=>{},
    game:null,
    gameModifier:(game:Game|null) => {},
    actualGameState:undefined,
    promoteX:0,
    colorTurn:ColorType.WHITE,
    colorTurnModifier: (color: ColorType) => {},
    pieces:[],
    piecesModifier: (pieces: PieceModel[][]) => {},
    currentPiece: null,
    currentPieceModifier: (piece: PieceModel | null) => {},
    possibleMoves:null,
    possibleMovesModifier:(moves:Coordinate[]|null) => {},
    getCurrentUserColor:()=>{return ColorType.WHITE},
}

export const GameContext = createContext<GameContextType>(defaultSetting)

export const GameContextProvider = ({ children }: React.PropsWithChildren) => {
    const userContext = useContext(UserContext)
    const [game,setGame] = useState<Game|null>(null)
    const [blockAction,setBlockAction] = useState<boolean>(false)
    const [actualGameState,setActualGameState] = useState<GameState|undefined>()
    const [promoteX,setPromoteX] = useState<number>(0)
    const [colorTurn,setColorTurn] = useState(ColorType.WHITE)
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
        setPromoteX(getCurrentUserColor() !== ColorType.WHITE ? 8 : 1)
    }, [currentPiece]);

    function colorTurnModifier(color:ColorType) {
        setColorTurn(color)
    }

    function gameModifier(game:Game|null) {
        setGame(game)
        setActualGameState(game !== null ? (game?.history.at(game?.history.length-1)):undefined)
        colorTurnModifier(game !== null ? game?.actualColor??ColorType.WHITE : ColorType.WHITE)
        piecesModifier(game !== null ? boardStateToBoard(game?.history.at(game.history.length - 1)?.boardState??"") : [])
        if(game === null){
            setBlockAction(false)
            setCurrentPiece(null)
        }
    }

    function blockActionModifier(blockAction:boolean) {
        setBlockAction(blockAction)
    }
    function getCurrentUserColor(){
        return game?.players.find(player => player.username == userContext.currentUser?.username)?.color ?? ColorType.WHITE
    }

    return (
        <GameContext.Provider value={{game,gameModifier, getCurrentUserColor,blockAction,blockActionModifier,actualGameState,promoteX,colorTurn,colorTurnModifier,possibleMoves,possibleMovesModifier,pieces,piecesModifier,currentPiece, currentPieceModifier}}> {children} </GameContext.Provider>
    )
}