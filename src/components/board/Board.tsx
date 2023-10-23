import {BoardContainer, ChessSquare} from "./Board.styles";
import React, {useState} from "react";
import {Piece} from "../piece/Piece";
import {
    closestCorners,
    DndContext, DragEndEvent, DragStartEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";

const spots = () => {
    const spots: React.ReactElement[] = [];
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            const color = (i + j) % 2 === 0 ? "white" : "black";
            if (i === 1 && j === 1) {
                spots.push(
                    <ChessSquare x={i} y={j} color={color} key={`${i}-${j}`}>
                        <Piece />
                    </ChessSquare>
                );
            } else {
                spots.push(
                    <ChessSquare x={i} y={j} color={color} key={`${i}-${j}`} />
                );
            }
        }
    }

    return spots;
};
export const Board = () =>{

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event
        console.log(active.id)
        console.log("start")
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        console.log("start")
    }

    return(
        <BoardContainer>
            <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>

            {spots()}
            </DndContext>
        </BoardContainer>
    )
}