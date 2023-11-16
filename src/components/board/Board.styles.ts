import styled from 'styled-components';

export const BoardContainer = styled.div<{playerColor:string ;}>`
 display: grid;
 grid-template-columns: repeat(8, 1fr);
 grid-template-rows:  repeat(8, 1fr);
 width: fit-content;
 aspect-ratio: 1;
 position: absolute;
 top: 50%;
 left: 45%;
 transform: translate(-50%, -50%) ${(props)=>props.playerColor==="BLACK" ? "rotate(180deg)" : ""};
 `
export const StyledChessSquare = styled.div<{ x: number; y: number; color: string;playerColor:string ;isPossibleMove:boolean}>`
 aspect-ratio: 1;
 width: 3rem;
 grid-column: ${(props) => props.y};
 grid-row: ${(props) => props.x};
 background:${(props) => props.isPossibleMove ? "red" :props.color};
 transform: ${(props)=>props.playerColor==="BLACK" ? "rotate(180deg)" : ""};
`;
