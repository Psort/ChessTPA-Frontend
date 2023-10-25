import {useDrop} from "react-dnd";
import {PiecesTypes} from "../../model/pieces/PieceType";
import {StyledChessSquare} from "./Board.styles";
import React, {useContext} from "react";
import {GameContext} from "../../context/GameContext";

type ChessSquareProps = {
    x: number,
    y: number,
    color: string,
    children?: React.ReactNode
}
export const ChessSquare = (props: ChessSquareProps) => {
    const context = useContext(GameContext)
    const [ { isOver, canDrop },drop] = useDrop({
        accept: PiecesTypes.KNIGHT,
        drop: () => context.move(props.x,props.y),
        canDrop: () => context.canMove(props.x,props.y),
        collect: monitor => ({
            isOver: monitor.isOver,
            canDrop: monitor.canDrop
        })
    });

    return (
        <div ref={drop}>
        <StyledChessSquare x={props.x} y={props.y} color={props.color}>
            {props.children}
        </StyledChessSquare>
        </div>
    )
}