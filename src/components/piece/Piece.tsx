import {BoardContainer} from "../board/Board.styles";
import React, {useEffect} from "react";
import {StyledPiece} from "./Piece.styles";
import {PieceModel} from "../../model/pieces/PieceModel";
import {  useDrag } from "react-dnd";
import {PiecesTypes} from "../../model/pieces/PieceType";

export const Piece = (piece:PieceModel) =>{
    const [{ isDragging }, drag] = useDrag({
        type: PiecesTypes.KNIGHT, // Ensure piece.type is of type PieceType
        item: { type: PiecesTypes.KNIGHT},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });
    useEffect(() => {
        if (isDragging){
            console.log(piece) // put to context
        }
    }, [isDragging]);
    return (
        <StyledPiece ref = {drag}
                     style={{
                         opacity: isDragging ? 0.5 : 1
                     }}
            c={piece.color}
        />
    );
}