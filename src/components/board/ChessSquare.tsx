import {useDrop} from "react-dnd";
import {PiecesTypes} from "../../model/pieces/PieceType";
import {StyledChessSquare} from "./Board.styles";
import React, {useContext, useEffect, useState} from "react";
import {GameContext} from "../../context/GameContext";

type ChessSquareProps = {
    x: number,
    y: number,
    color: string,
    children?: React.ReactNode
}
export const ChessSquare = (props: ChessSquareProps) => {
    const context = useContext(GameContext)
    const [isPossibleMove,setIsPossibleMove] = useState(false)
    const [ { isOver, canDrop },drop] = useDrop({
        accept: context.currentPiece?.type??"",
        drop: () => move(props.x,props.y),
        canDrop: () => canMove(props.x,props.y),
        collect: monitor => ({
            isOver: monitor.isOver,
            canDrop: monitor.canDrop,
        })
    });
    const move = (x: number, y: number) => {
        if (context.currentPiece) {
            const updatedPieces = context.pieces.map(piece =>
                (piece.x === context.currentPiece?.x && piece.y === context.currentPiece.y)
                    ? { ...piece, x, y } : piece
            );

            let updatedCurrentPiece = { ...context.currentPiece }; // Create a mutable copy

            if (context.currentPiece.type === PiecesTypes.PAWN && context.promoteX === x) {
                updatedCurrentPiece = { ...context.currentPiece, type: PiecesTypes.QUEEN };
            }

            const pieceIndex = updatedPieces.findIndex(piece => piece.x === x && piece.y === y);
            if (pieceIndex !== -1) {
                updatedPieces[pieceIndex].color = updatedCurrentPiece.color;
                updatedPieces[pieceIndex].type = updatedCurrentPiece.type;
            }

            context.piecesModifier(updatedPieces.filter(piece => piece.x !== updatedCurrentPiece.x || piece.y !== updatedCurrentPiece.y));
            context.colorTurnModifier(context.colorTurn == "white"?"black":"white")
        }
    };
    function canMove(x: number, y: number) {

        if (context.currentPiece?.color != context.colorTurn){
            return false
        }
        if(context.possibleMoves){
            return !!context.possibleMoves?.find(move => move.x === x && move.y+1 === y);
        }
        return false
    }
    useEffect(() => {
        const hasPossibleMoves= context.possibleMoves?!!context.possibleMoves?.find(move => move.x === props.x && move.y+1 === props.y):false
        setIsPossibleMove(hasPossibleMoves);
    }, [context.possibleMoves]);

    return (
        <div ref={drop}>
        <StyledChessSquare x={props.x} y={props.y} color={props.color} isPossibleMove={isPossibleMove}>
            {props.children}
        </StyledChessSquare>
        </div>
    )
}