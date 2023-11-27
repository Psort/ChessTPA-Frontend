
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Img, StyledPiece} from "./Piece.styles";
import {PieceModel} from "../../model/pieces/PieceModel";
import { useDrag } from "react-dnd";
import {GameContext} from "../../context/GameContext";
import {boardToBoardState, convertPosition,} from "../../utils/GameContextUtils";
import {EngineApi} from "../../api/EngineApi";

export const Piece = (piece:PieceModel) =>{
    const gameContext = useContext(GameContext)
    const[board,setBoard] = useState("")
    const [{ isDragging }, drag] = useDrag({
        type: piece.type!!, // Ensure piece.type is of type PieceType
        item: { type: piece.type},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        }),
        canDrag:monitor => {return !gameContext.blockAction && gameContext.getCurrentUserColor() === piece.color}
    });
    const setPossibleMoves = useCallback(async () =>{
        try {
            const response = await EngineApi.getPossibleMoves({
                boardState: board,
                piecePosition: convertPosition(gameContext.currentPiece?.x, gameContext.currentPiece?.y),
                castles: gameContext.actualGameState?.castleTypes??[]
            });
            gameContext.possibleMovesModifier(response.data)
        } catch (error) {
            // console.log(error)
        }
        return true;
    },[board,gameContext])
    useEffect(() => {
        if (board){
            setPossibleMoves()
        }
    }, [board,gameContext.currentPiece]);
    useEffect(() => {
        if (isDragging) {
            gameContext.currentPieceModifier(piece)
            setBoard(boardToBoardState(gameContext.pieces))
        }
        else{
            gameContext.possibleMovesModifier(null)
        }
    }, [isDragging]);
    return (
        <StyledPiece ref = {drag}
                     style={{
                         opacity: isDragging ? 0.5 : 1
                     }} >
            <Img src={require("../../resources/Img/Pieces/"+piece.type+piece.color.toLowerCase()+".png")}/>
        </StyledPiece>
    );
}