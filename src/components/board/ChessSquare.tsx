import {useDrop} from "react-dnd";
import {StyledChessSquare} from "./Board.styles";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {GameContext} from "../../context/GameContext";
import {PieceType} from "../../model/pieces/PieceType";
import {EngineApi} from "../../api/EngineApi";
import {boardToBoardState, convertPosition} from "../../utils/GameContextUtils";
import {GameApi} from "../../api/GameApi";
import {UserContext} from "../../context/UserContext";
import {sendMessageWithGameId} from "../../message/MessageSender";

type ChessSquareProps = {
    x: number,
    y: number,
    color: string,
    playerColor: string,
    children?: React.ReactNode
}
export const ChessSquare = (props: ChessSquareProps) => {
    const [isPossibleMove,setIsPossibleMove] = useState(false)
    const [gameStatus,setGameStatus] = useState("")
    const gameContext = useContext(GameContext)
    const userContext = useContext(UserContext)
    const [ { isOver, canDrop },drop] = useDrop({
        accept: Object.values(PieceType),
        drop: () => move(props.x,props.y),
        canDrop: () => canMove(props.x,props.y),
        collect: monitor => ({
            isOver: monitor.isOver,
            canDrop: monitor.canDrop,
        })
    });

    const getGameStatus  = useCallback(async (board:string) => {
        try {
            const response = await EngineApi.getGameStatus({
                boardState:board,
                color:gameContext.colorTurn.toLowerCase() === "white" ? "black" : "white",
                castles:gameContext.actualGameState?.castleTypes??[],
            });
            setGameStatus(response.data)
            return response.data
        } catch (error: any) {
            console.log(error)
        }
    }, [gameContext.colorTurn]);

    const safeGameStatus  = useCallback(async (board:string,gameStatus:string,startCoordinate:string,moveCoordinate:string) => {
        try {
            await GameApi.safeGameStatus({
               gameId:gameContext.game?.id,
                boardState:board,
                move:{
                    player:userContext.currentUser,
                    coordinates: [startCoordinate,moveCoordinate]
                },
                gameStatus:gameStatus
            });
        } catch (error: any) {
            console.log(error)
        }
    }, [userContext.currentUser,gameContext.game?.id]);

    const move = (x: number, y: number) => {
        if (gameContext.currentPiece) {
            const clonedBoard = JSON.parse(JSON.stringify(gameContext.pieces)); // Deep clone to avoid mutation
            const actualX = gameContext.currentPiece.x
            const actualY = gameContext.currentPiece.y

            clonedBoard[x-1][y-1].type = gameContext.currentPiece.type
            clonedBoard[x-1][y-1].color = gameContext.currentPiece.color
            clonedBoard[actualX-1][actualY-1].type = null
            clonedBoard[actualX-1][actualY-1].color = ""

            if (gameContext.currentPiece.type === PieceType.PAWN && gameContext.promoteX === x) {
                clonedBoard[x-1][y-1].type = PieceType.QUEEN
                console.log("to Do to Other Pieces")
            }

            gameContext.piecesModifier(clonedBoard);
            getGameStatus(boardToBoardState(clonedBoard)).then(gameStatus=>{
                safeGameStatus(boardToBoardState(clonedBoard),gameStatus,convertPosition(actualX, actualY),convertPosition(x, y))
            })

            if(gameContext.game?.id) {
                sendMessageWithGameId(gameContext.game?.id)
            }
        }
    };
    
    useEffect(() => {
        switch (gameStatus) {
            case "GAME":
                console.log("Game");
                break;
            case "CHECKMATE":
                console.log("CHECKMATE");
                break;
            case "PAT":
                console.log("PAT");
                break;
            default:
                console.log("D:"+gameStatus);
        }
    }, [gameStatus]);

    function canMove(x: number, y: number) {
        if (gameContext.currentPiece?.color !== gameContext.colorTurn.toLowerCase()){
            return false
        }
        if(gameContext.possibleMoves){
            return !!gameContext.possibleMoves?.find(move => move.x === x && move.y+1 === y);
        }
        return false
    }
    useEffect(() => {
        const hasPossibleMoves= gameContext.possibleMoves?!!gameContext.possibleMoves?.find(move => move.x === props.x && move.y+1 === props.y):false
        setIsPossibleMove(hasPossibleMoves);
    }, [gameContext.possibleMoves,props.x,props.y]);

    return (
        <div ref={drop}>
        <StyledChessSquare x={props.x} y={props.y} color={props.color} isPossibleMove={isPossibleMove} playerColor={props.playerColor}>
            {props.children}
        </StyledChessSquare>
        </div>
    )
}