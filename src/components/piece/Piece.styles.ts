import styled from 'styled-components';

export const StyledPiece = styled.div<{ c: string }>`
    height: 90%;
  background: ${props => props.c};
  aspect-ratio: 1;
    `