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
import {ColorType} from "../../model/game/ColorType";
import {ToolTip} from "./ToolTip";
import {PieceModel} from "../../model/pieces/PieceModel";
import moveSound from "../../resources/sounds/moveSound.mp3"

type ChessSquareProps = {
    x: number,
    y: number,
    color: ColorType,
    playerColor: ColorType,
    children?: React.ReactNode
}
export const ChessSquare = (props: ChessSquareProps) => {
    const [isPossibleMove,setIsPossibleMove] = useState(false)
    const [isMoveSoundPlaying, setIsMoveSoundPlaying] = useState(false);
    const [showTooltip,setShowTooltip] = useState(false)
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
    const playMoveSound = () => {
        const audioElement = new Audio(moveSound);
        audioElement.play();
        setIsMoveSoundPlaying(true);

        audioElement.addEventListener('ended', () => {
            setIsMoveSoundPlaying(false);
        });
    };

    const getGameStatus  = useCallback(async (board:string) => {
        try {
            const response = await EngineApi.getGameStatus({
                boardState:board,
                color:gameContext.colorTurn === ColorType.WHITE ? ColorType.BLACK : ColorType.WHITE,
                castles:gameContext.actualGameState?.castleTypes??[],
            });
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

    function changePiecePosition(clonedBoard:PieceModel[][],color:ColorType,type:PieceType|null,actualX: number, actualY: number, x: number, y: number) {
        clonedBoard[x - 1][y - 1].type = type
        clonedBoard[x - 1][y - 1].color = color
        clonedBoard[actualX - 1][actualY - 1].type = null
    }

    const move = (x: number, y: number) => {
        if (gameContext.currentPiece) {
            playMoveSound();
            const clonedBoard = JSON.parse(JSON.stringify(gameContext.pieces)); // Deep clone to avoid mutation
            const actualX = gameContext.currentPiece.x
            const actualY = gameContext.currentPiece.y
            const type = gameContext.currentPiece.type
            const color = gameContext.currentPiece.color

            changePiecePosition(clonedBoard,color,type, actualX, actualY, x, y);

            if (type == PieceType.KING && Math.abs(actualY - y) == 2){
                const emptyY = actualY > y ? 1 : 8;
                const RookY = actualY > y ? 4 : 6;
                changePiecePosition(clonedBoard,color,PieceType.ROOK, x, emptyY, x, RookY);
            }

            gameContext.piecesModifier(clonedBoard);

            if (gameContext.currentPiece.type === PieceType.PAWN && gameContext.promoteX === x) {
                setShowTooltip(true)
                gameContext.blockActionModifier(true)
            }
            else {
                safeGame(clonedBoard,x,y)
            }
        }
    };

    function safeGame(clonedBoard:PieceModel[][],x:number,y:number){
        const actualX = gameContext.currentPiece?.x
        const actualY = gameContext.currentPiece?.y

        getGameStatus(boardToBoardState(clonedBoard)).then(gameStatus=>{
            safeGameStatus(boardToBoardState(clonedBoard),gameStatus,convertPosition(actualX, actualY),convertPosition(x, y)).then(r=>{
                if(gameContext.game?.id) {
                    sendMessageWithGameId(gameContext.game?.id)
                }
            })
        })
    }

    function canMove(x: number, y: number) {
        if (gameContext.currentPiece?.color !== gameContext.colorTurn){
            return false
        }
        if(gameContext.possibleMoves){
            return !!gameContext.possibleMoves?.find(move => move.x === x && move.y+1 === y);
        }
        return false
        // return true
    }

    useEffect(() => {
        const hasPossibleMoves= gameContext.possibleMoves?!!gameContext.possibleMoves?.find(move => move.x === props.x && move.y+1 === props.y):false
        setIsPossibleMove(hasPossibleMoves);
    }, [gameContext.possibleMoves,props.x,props.y]);

    return (
        <div ref={drop}>
                <StyledChessSquare x={props.x} y={props.y} color={props.color} isPossibleMove={isPossibleMove} playerColor={props.playerColor} data-tooltip-id={showTooltip ? "my-tooltip":""} >
                    {props.children}
                    {showTooltip &&
                        <ToolTip safeGame={safeGame} playerColor={props.playerColor} x={props.x} y ={props.y} showTooltip={showTooltip} setShowTooltip={setShowTooltip}/>}
                </StyledChessSquare>
         </div>
    )
}