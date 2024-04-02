import styled from 'styled-components';
import {ColorType} from "../../model/game/ColorType";

export const BoardContainer = styled.div<{playerColor:string ;}>`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    width: 90%;
    aspect-ratio: 1;
    position: relative;
    top: 35%;
    left: 45%;
    transform: translate(-50%, -50%) ${(props)=>props.playerColor===ColorType.BLACK ? "rotate(180deg)" : ""};
 `
export const StyledChessSquare = styled.div<{ x: number; y: number; color: string;playerColor:ColorType ;isPossibleMove:boolean}>`
    aspect-ratio: 1;
    width: 100%;
    grid-column: ${(props) => props.y};
    grid-row: ${(props) => props.x};
    background:${(props) => props.isPossibleMove ? "red" :props.color};
    transform: ${(props)=>props.playerColor===ColorType.BLACK ? "rotate(180deg)" : ""};
`;
export const ChangeFigureButton = styled.button`
    width: 2rem;
    aspect-ratio: 1;
    background: transparent;
`;
export const TooltipImg = styled.img<{playerColor:ColorType}>`
  width: 100%;
 height: 100%;
 transform: ${(props)=>props.playerColor===ColorType.BLACK ? "rotate(180deg)" : ""};
`;

export const StyledPiece = styled.div`
  height: 100%;
  aspect-ratio: 1;
    `
export const PieceImg = styled.img`
  width: 100%; /* Automatyczna dostosowana szerokość dla utrzymania proporcji */
  height: 100%; /
  padding: 0;
  margin: 0;
  //image
    `