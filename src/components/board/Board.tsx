import {BoardContainer, ChessSquare} from "./Board.styles";
import React from "react";

const spots = () => {
    const spots: React.ReactElement[] = [];
    for (let i = 1; i <=8; i++) {
        for (let j = 1; j <=8; j++) {
            const isWhite = (i + j) % 2 === 0;

            spots.push(<ChessSquare x={i} y={j} isWhite={isWhite} key={`${i}-${j}`} />);
        }
    }

    return spots;
};
export const Board = () =>{
    return(
        <BoardContainer>
            {spots()}
        </BoardContainer>
    )
}