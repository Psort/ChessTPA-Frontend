import {useDrop} from "react-dnd";
import {StyledChessSquare} from "./Board.styles";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {GameContext} from "../../context/GameContext";
import {PieceType} from "../../model/pieces/PieceType";
import {convertPosition} from "../../utils/GameContextUtils";
import {GameApi} from "../../api/GameApi";
import {UserContext} from "../../context/UserContext";
import {sendGameWithGameId} from "../../message/MessageSender";
import {ColorType} from "../../model/game/ColorType";
import {ToolTip} from "./ToolTip";
import {PieceModel} from "../../model/pieces/PieceModel";
import moveSound from "../../resources/sounds/moveSound.mp3"
import {mul} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

type ChessSquareProps = {
    x: number,
    y: number,
    color: ColorType,
    playerColor: ColorType,
    children?: React.ReactNode
}
export const ChessSquare = (props: ChessSquareProps) => {
    const [isPossibleMove,setIsPossibleMove] = useState(false)
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
    };


    const safeGameState  = useCallback(async (startCoordinate:string,moveCoordinate:string,type: string) => {
        try {
            console.log(type)
            await GameApi.safeGameState({
               gameId:gameContext.game?.id,
                move:{
                    startingCoordinates: startCoordinate,
                    endingCoordinates:moveCoordinate,
                },
                newPawnType:type
            });
        } catch (error: any) {
            console.log(error)
        }
    }, [userContext.currentUser,gameContext.game?.id]);

    function changePiecePosition(clonedBoard:PieceModel[][],color:ColorType,type:PieceType|null,actualX: number, actualY: number, x: number, y: number) {
        console.log(clonedBoard)
        clonedBoard[8-x][y - 1].type = type
        clonedBoard[8-x][y - 1].color = color
        clonedBoard[8-actualX ][actualY - 1].type = null
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
                changePiecePosition(clonedBoard,color,PieceType.ROOK, actualX, emptyY, x, RookY);
            }
            gameContext.piecesModifier(clonedBoard);
            if (gameContext.currentPiece.type === PieceType.PAWN && gameContext.promoteX === x) {
                setShowTooltip(true)
                gameContext.blockActionModifier(true)
            }
            else {
                safeGame(x,y,"")
            }
        }
    };

    function safeGame(x:number,y:number,type: string){
        const actualX = gameContext.currentPiece?.x
        const actualY = gameContext.currentPiece?.y
        safeGameState(convertPosition(actualX, actualY),convertPosition(x, y),type).then(r=>{
            if(gameContext.game?.id) {
                sendGameWithGameId(gameContext.game?.id)
            }
        })

    }

    function canMove(x: number, y: number) {
        if (gameContext.currentPiece?.color !== gameContext.colorTurn){
            return false
        }
        if(gameContext.currentPiece.possibleMoves){
            return !!gameContext.currentPiece.possibleMoves?.find(move => move.x+1 === x && move.y+1 === y);
        }
        return false
    }

    useEffect(() => {
        const hasPossibleMoves= gameContext.currentPiece?.possibleMoves?!!gameContext.currentPiece.possibleMoves?.find(move => move.x+1 === props.x && move.y+1 === props.y):false
        setIsPossibleMove(hasPossibleMoves);
    }, [gameContext.currentPiece?.possibleMoves,props.x,props.y]);

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