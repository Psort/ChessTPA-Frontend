import React, {useCallback, useContext, useEffect, useState} from "react";
import {PieceModel} from "../../model/pieces/PieceModel";
import { useDrag } from "react-dnd";
import {GameContext} from "../../context/GameContext";
import {boardToBoardState, convertPosition,} from "../../utils/GameContextUtils";
import {EngineApi} from "../../api/EngineApi";
import {PieceImg, StyledPiece} from "./Board.styles";
import {Coordinate} from "../../model/api/engine/Coordinate";
import {UserContext} from "../../context/UserContext";

export const Piece = (piece:PieceModel) =>{
    const gameContext = useContext(GameContext)
    const [possibleMoves,setPossibleMoves] = useState<Coordinate[]>();
    const [{ isDragging }, drag] = useDrag({
        type: piece.type!!, // Ensure piece.type is of type PieceType
        item: { type: piece.type},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        }),
        canDrag:monitor => {return !gameContext.blockAction && gameContext.getCurrentUserColor() === piece.color}
    });
    const getPossibleMoves = useCallback(async () =>{
        try {
            const response = await EngineApi.getPossibleMoves({
                boardState: gameContext.actualGameState?.boardState??"",
                piecePosition:convertPosition(piece.x, piece.y),
                castles: gameContext.actualGameState?.castleTypes??[]
            });
            setPossibleMoves(response.data)
        } catch (error) {
            // console.log(error)
        }
        return true;
    },[gameContext.actualGameState])

    useEffect(() => {
        if (isDragging) {
            gameContext.currentPieceModifier(piece)
            gameContext.possibleMovesModifier(possibleMoves??null)
        }
        else{
            gameContext.possibleMovesModifier(null)
        }
    }, [isDragging]);
    useEffect(() => {
        if(piece.color===gameContext.getCurrentUserColor()){
            getPossibleMoves()
        }
    }, [gameContext.colorTurn]);
    return (
        <StyledPiece ref = {drag}
                     style={{
                         opacity: isDragging ? 0.5 : 1
                     }} >
            <PieceImg src={require("../../resources/Img/Pieces/"+piece.type+piece.color.toLowerCase()+".png")}/>
        </StyledPiece>
    );
}