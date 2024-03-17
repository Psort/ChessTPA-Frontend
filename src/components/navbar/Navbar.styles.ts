import styled, {keyframes} from "styled-components";

export const NavContainer = styled.div`
    width: 10vw;
  min-width: fit-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 1rem;
  gap: 1rem;
  background:  var(--color-secondary);
  box-shadow: 0px 4px 490px 10px var(--color-primary);
  @media(max-width: 960px){
    flex-direction: row;
    width: 100vw;
    height: 10vh;
    box-shadow: 0 4px 490px 10px var(--color-primary);
  }
`
export const Logo = styled.img`
  width: 5rem;
  height: 5rem;
  background: var(--color-primary);
  @media(max-width: 960px){
    height: 100%;
  }
`
export const RegisterButton = styled.button`
  display: block;
  width: 80%;
  height: 2rem;
  color: var(--color-primary);
  background-color: transparent;
  font-weight: 600;
  font-size: 14px;
  margin: 0;
  border: 0;
  outline: 1px solid var(--color-primary);
  border-radius: 8px;
  line-height: 1;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  
  &:hover {
    background-color: var(--color-primary);
    color: #161616;
  }
  @media(max-width:480px){
    width: 75%;
  }
`;
export const LoginButton = styled.button`
  display: block;
  width: 80%;
  height: 2rem;
  color: var(--color-white);
  background-color:var(--color-primary);
  font-weight: 600;
  font-size: 14px;
  margin: 0;
  border: 0;
  outline: 1px solid var(--color-primary);
  border-radius: 8px;
  line-height: 1;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  
  &:hover {
    background-color: transparent;
    color: #161616;
  }
  @media(max-width:480px){
    width: 75%;
  }
`;
