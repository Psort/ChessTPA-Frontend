import {BoardContainer, ChessSquare} from "./Board.styles";
import React, {useEffect} from "react";
import {Piece} from "../piece/Piece";
import {pieces} from "../../model/pieces/Pieces";
import {PiecesTypes} from "../../model/pieces/PieceType";
import {useDrop} from "react-dnd";



export const Board = () =>{
    const [ { isOver, canDrop },drop] = useDrop({
        accept: PiecesTypes.KNIGHT,
        drop: () => console.log("to DO"),
        canDrop: () => true,
        collect: monitor => ({
            isOver: monitor.isOver,
            canDrop: monitor.canDrop
        })
    });

    useEffect(() => {
        console.log(isOver)
        console.log(canDrop)
    }, [isOver,canDrop]);
    const spots = () => {
        const spots: React.ReactElement[] = [];
        for (let i = 1; i <= 8; i++) {
            for (let j = 1; j <= 8; j++) {
                const color = (i + j) % 2 === 0 ? "white" : "black";
                const piece = pieces.find(piece => piece.x == i && piece.y == j)
                console.log(piece)
                    spots.push(
                        <ChessSquare  x={i} y={j} color={color} className="board" key={`${i}-${j}`} >
                            {piece &&(
                                <Piece color={piece.color} type={piece.type} x={piece.x} y={piece.y}/>
                            )}
                        </ChessSquare>
                    );

                }
            }
        return spots;
    };

    return(
        <BoardContainer ref={drop}  >
                    {spots()}
        </BoardContainer>
    )
}