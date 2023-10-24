
import React, {useContext, useEffect} from "react";
import {Img, StyledPiece} from "./Piece.styles";
import {PieceModel} from "../../model/pieces/PieceModel";
import {  useDrag } from "react-dnd";
import {PiecesTypes} from "../../model/pieces/PieceType";
import {GameContext} from "../../context/GameContext";

export const Piece = (piece:PieceModel) =>{
    const context = useContext(GameContext)
    const [{ isDragging }, drag] = useDrag({
        type: PiecesTypes.KNIGHT, // Ensure piece.type is of type PieceType
        item: { type: PiecesTypes.KNIGHT},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });
    useEffect(() => {
        if (isDragging){
            context.currentPieceModifier(piece)
        }
    }, [isDragging]);
    return (
        <StyledPiece ref = {drag}
                     style={{
                         opacity: isDragging ? 0.5 : 1
                     }}>
            <Img src={require("../../resources/Img/Pieces/"+piece.type+piece.color+".png")}/>
        </StyledPiece>
    );
}