
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Img, StyledPiece} from "./Piece.styles";
import {PieceModel} from "../../model/pieces/PieceModel";
import {  useDrag } from "react-dnd";
import {GameContext} from "../../context/GameContext";
import {convertPosition, generateChessboard} from "../../utils/GameContextUtils";
import {GameApi} from "../../api/GameApi";

export const Piece = (piece:PieceModel) =>{
    const context = useContext(GameContext)
    const[board,setBoard] = useState("")
    const [{ isDragging }, drag] = useDrag({
        type: piece.type, // Ensure piece.type is of type PieceType
        item: { type: piece.type},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });
    const setPossibleMoves = useCallback(async () =>{
        try {

            const response = await GameApi.getPossibleMoves({
                boardState: board,
                piecePosition: convertPosition(context.currentPiece?.x, context.currentPiece?.y)
            });
            context.possibleMovesModifier(response.data)
            // console.log(response.data)
        } catch (error) {
            // console.log(error)
        }
        return true;
    },[board,context])
    useEffect(() => {
        if (board){
            setPossibleMoves()
        }
    }, [board,context.currentPiece]);
    useEffect(() => {
        if (isDragging){
            context.currentPieceModifier(piece)
            setBoard(generateChessboard(context.pieces))
        }else{
            context.possibleMovesModifier(null)
        }
    }, [isDragging]);
    return (
        <StyledPiece ref = {drag}
                     style={{
                         opacity: isDragging ? 0.5 : 1
                     }} >
            <Img src={require("../../resources/Img/Pieces/"+piece.type+piece.color+".png")}/>
        </StyledPiece>
    );
}