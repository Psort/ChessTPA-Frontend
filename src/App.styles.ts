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
  @media(max-width: 960px){
    width: 100vw;
    height: 90vh;
  }
`