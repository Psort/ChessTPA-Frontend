import styled from "styled-components";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";

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
export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction:row;
  @media(max-width: 960px){
    display: flex;
    flex-direction: column-reverse;
  }
`
export const Left = styled.div`
  width: 45%;
  height: 100vh;
  display: flex;
    flex-direction: column;
  justify-content: center;
  align-items: center;
  @media(max-width: 960px){
    width: 100%;
    height: 40vh;
  }
`
export const Right = styled.div`
  width: 45%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media(max-width: 960px){
    margin-top: 20%;
    width: 100vw;
    height: 40vh;
    padding: 0;
  }
`
export const Button = styled.button`
    width: 15rem;
    height: 10rem;
    background-color: rgba(0, 0, 0, 0.7);
    color: var(--color-primary);
    border-radius: 1rem;
  box-shadow: 0 0 0.25rem var(--color-primary);
    padding: 2rem;
    text-align: center;
    position: relative;
    font-size: 1rem;

  &:hover {
    background-color: var(--color-primary);
    color: #161616;
  }
`
export const AsciiContainer = styled.div`
    white-space: pre;
`;
export const PlayButton = styled(Button)`
    width: 20rem;
    height: 5rem;
    background-color: var(--background-color);
    color: var(--color-primary);
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
    position: relative;
    font-size: 1rem;

  &:hover {
    background-color: var(--color-primary);
    color: #161616;
  }
`
export const PlayAccordion = styled(Accordion)`
  background-color: var(--color-bg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .MuiAccordionSummary-content {
    width: 100%;
    background-color: var(--color-bg) !important;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .MuiAccordionDetails-root {
    background-color: var(--color-bg) !important;
  }
`;
export const PlayAccordionSummary = styled(AccordionSummary)`
  box-shadow:
            0 -0.5rem 1rem rgba(238, 38, 229, 0.2)
            //0 -1rem 2rem rgba(238, 38, 229, 0.1),
            //0 -2rem 4rem rgba(238, 38, 229, 0.2),
            //0 -4rem 8rem rgba(238, 38, 229, 0.1),
            //0 -8rem 16rem rgba(238, 38, 229, 0.1),
            0 -16rem 32rem rgba(238, 38, 229, 0.2); !important;
  
  width: 100%;
  background-color: var(--color-bg) !important;
  
`;

export const PlayTypography = styled(Typography)`
  color: var(--color-primary);
`;

export const PlayAccordionDetails = styled(AccordionDetails)`
  background-color: var(--color-bg) !important;
`;

export const SpinnerUpperDiv = styled.div`
  text-align: center;
`;

export const SpinnerLowerDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const LeaveDiv = styled.div`
  margin-top: 3rem;
`
export const MatchmakingText = styled.h2`
    color: var(--color-primary);
`
