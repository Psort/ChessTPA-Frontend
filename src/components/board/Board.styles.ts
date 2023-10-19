import styled from 'styled-components';

export const BoardContainer = styled.div`
  display: grid;
 background: red;
 grid-template-columns: repeat(8, 1fr);
 grid-template-rows: repeat(8, 1fr);
  width: fit-content;
  aspect-ratio: 1;
 position: absolute;
 top: 50%;
 left: 45%;
 transform: translate(-50%, -50%);
 `
export const ChessSquare = styled.div<{
 isWhite:boolean,
 x:number,
 y:number,
}>`
 background: ${props => (props.isWhite ? "#FFFFFF" : 'black')};
 aspect-ratio: 1;
 width: 5rem;
 grid-column: ${props => props.x};
 grid-row: ${props => props.y};
`