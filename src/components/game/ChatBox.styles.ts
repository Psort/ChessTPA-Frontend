import styled from 'styled-components';

export const ChatBoxContainer = styled.div`
  height: 10rem;
  width: 17rem;
  //position: absolute;
  //margin-right: 80rem;
  border-radius: 1rem;
  box-shadow: 0 0 2rem var(--color-primary);
  justify-content: start;  // Zaczynaj od góry
  align-content: start;  // Zaczynaj od góry
  padding: 1rem;  // Dodaj padding, aby tekst nie przylegał do krawędzi
`;

export const Messages = styled.div`
  height: 80%;
  width: 100%;
    border: #EE26E5 solid 1px;
`;

export const Text = styled.input`
  height: 2rem;
  width: 80%;

`;
export const SendButton = styled.div`
  height: 2rem;
  width: 10%;
    background: white;
    border: #EE26E5 1px solid;
    
`;