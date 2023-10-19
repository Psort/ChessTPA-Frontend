import {BoardContainer, Element} from "./Board.styles";

export const Board = () =>{
    return(
        <BoardContainer>
            <Element isWhite={true} x={1} y={1} />
            <Element isWhite={false} x={1} y={1} />
            <Element isWhite={true} x={1} y={2} />
            <Element isWhite={false} x={1} y={3} />
            <Element isWhite={true} x={1} y={4} />
            <Element isWhite={false} x={1} y={5} />
            <Element isWhite={true} x={1} y={6} />
        </BoardContainer>
    )
}