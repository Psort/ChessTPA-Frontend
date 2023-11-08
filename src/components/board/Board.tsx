import {BoardContainer} from "./Board.styles";
import React, {useContext, useEffect} from "react";
import {Piece} from "../piece/Piece";
import {ChessSquare} from "./ChessSquare";
import {GameContext} from "../../context/GameContext";

export const Board = () => {
    const gameContext = useContext(GameContext)
    const spots: React.ReactElement[] = Array.from({length: 64}, (_, index) => {
        const i = Math.floor(index / 8) + 1;
        const j = index % 8 + 1;
        const color = (i + j) % 2 === 0 ? "white" : "black";
        const piece = gameContext.pieces.find(piece => piece.x === i && piece.y === j);
        return (
            <ChessSquare x={i} y={j} color={color} key={`${i}-${j}`}>
                {piece && <Piece color={piece.color} type={piece.type} x={piece.x} y={piece.y}/>}
            </ChessSquare>
        );
    });
    return(
        <BoardContainer >
            {spots}
        </BoardContainer>
    )
}
