import styled from "styled-components";

export const AppContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: row-reverse;
  @media(max-width: 960px){
    flex-direction: column;
  }
`
export const Section = styled.div`
    width: 90vw;
    height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media(max-width: 960px){
    width: 100vw;
    height: 90vh;
  }
`
export const Button = styled.button`
    width: 15rem;
    height: 10rem;
    background-color: rgba(0, 0, 0, 0.7);
    color: var(--color-primary);
    border-radius: 1rem;
    box-shadow: 0 0 2rem var(--color-primary);
    padding: 2rem;
    text-align: center;
    position: relative;
    font-size: 1rem;

  &:hover {
    background-color: var(--color-primary);
    color: #161616;
  }
`