import {useDrop} from "react-dnd";
import {StyledChessSquare} from "./Board.styles";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {GameContext} from "../../context/GameContext";
import {PieceType} from "../../model/pieces/PieceType";
import {EngineApi} from "../../api/EngineApi";
import {boardToBoardState} from "../../utils/GameContextUtils";

type ChessSquareProps = {
    x: number,
    y: number,
    color: string,
    children?: React.ReactNode
}
export const ChessSquare = (props: ChessSquareProps) => {
    const gameContext = useContext(GameContext)
    const [isPossibleMove,setIsPossibleMove] = useState(false)
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
                color:gameContext.colorTurn === "white" ? "black" : "white",
                castles:[],
            });
            console.log(response.data)
        } catch (error: any) {
            console.log(error)
        }
    }, [gameContext.colorTurn,gameContext.pieces]);
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
            getGameStatus(boardToBoardState(clonedBoard))
            gameContext.colorTurnModifier(gameContext.colorTurn === "white" ? "black" : "white");
        }
    };


    function canMove(x: number, y: number) {
        if (gameContext.currentPiece?.color !== gameContext.colorTurn){
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
    }, [gameContext.possibleMoves]);

    return (
        <div ref={drop}>
        <StyledChessSquare x={props.x} y={props.y} color={props.color} isPossibleMove={isPossibleMove}>
            {props.children}
        </StyledChessSquare>
        </div>
    )
}