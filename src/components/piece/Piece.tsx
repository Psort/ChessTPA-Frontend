
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Img, StyledPiece} from "./Piece.styles";
import {PieceModel} from "../../model/pieces/PieceModel";
import {  useDrag } from "react-dnd";
import {GameContext} from "../../context/GameContext";
import {boardToBoardState, convertPosition, } from "../../utils/GameContextUtils";
import {GameApi} from "../../api/GameApi";
import {EngineApi} from "../../api/EngineApi";

export const Piece = (piece:PieceModel) =>{
    const gameContext = useContext(GameContext)
    const[board,setBoard] = useState("")
    const [{ isDragging }, drag] = useDrag({
        type: piece.type!!, // Ensure piece.type is of type PieceType
        item: { type: piece.type},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });
    const setPossibleMoves = useCallback(async () =>{
        try {

            // const history = gameContext.game?.history
            // if (history && history.length > 0) {
            //     const lastItem = history[history.length - 1];
            //     setCastles(lastItem.castleTypes)
            // }
            const response = await EngineApi.getPossibleMoves({
                boardState: board,
                piecePosition: convertPosition(gameContext.currentPiece?.x, gameContext.currentPiece?.y),
                castles: []
            });
            gameContext.possibleMovesModifier(response.data)
            // console.log(response.data)
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
            <Img src={require("../../resources/Img/Pieces/"+piece.type+piece.color+".png")}/>
        </StyledPiece>
    );
}