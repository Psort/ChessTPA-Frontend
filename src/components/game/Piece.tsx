import React, {useCallback, useContext, useEffect, useState} from "react";
import {PieceModel} from "../../model/pieces/PieceModel";
import { useDrag } from "react-dnd";
import {GameContext} from "../../context/GameContext";
import {PieceImg, StyledPiece} from "./Board.styles";
import {Coordinate} from "../../model/api/engine/Coordinate";


export const Piece = (piece:PieceModel) =>{
    const gameContext = useContext(GameContext)
    const [possibleMoves,setPossibleMoves] = useState<Coordinate[]|undefined>(piece.possibleMoves);
    const [{ isDragging }, drag] = useDrag({
        type: piece.type!!, // Ensure piece.type is of type PieceType
        item: { type: piece.type},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        }),
        canDrag:monitor => {return !gameContext.blockAction && gameContext.getCurrentUserColor() === piece.color}
    });

    useEffect(() => {
        if (isDragging) {
            gameContext.currentPieceModifier(piece)
        }
        else{
            gameContext.currentPieceModifier(null)
        }
    }, [isDragging]);
    return (
        <StyledPiece ref = {drag}
                     style={{
                         opacity: isDragging ? 0.5 : 1
                     }} >
            <PieceImg src={require("../../resources/Img/Pieces/"+piece.type+piece.color.toLowerCase()+".png")}/>
        </StyledPiece>
    );
}