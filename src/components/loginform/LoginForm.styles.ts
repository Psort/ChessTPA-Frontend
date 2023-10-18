import styled from 'styled-components';

export const LoginContainer = styled.div`
display: flex;
  width: 90%;
  height: 100%;
  position: absolute;
  background: transparent;
  top: 0;
  left: 0;
 `
export const FormWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  place-items: center;
  width: 25%;
  height: 70%;
  padding: 25px;
  background-color: var(--color-secondary);
  box-shadow: 0px 15px 60px var(--color-primary);
  outline: 1px solid var(--color-primary);
  border-radius: 10px;
  @media(max-width: 960px){
    width: 30%;
  }
  @media(max-width:480px){
    width: 90%;
  }
`;

export const WelcomeLines = styled.div`
  text-align: center;
  line-height: 1;
`;

export const WelcomeLine1 = styled.div`
  color: var(--color-primary);
  font-weight: 600;
  font-size: 40px;
`;

export const WelcomeLine2 = styled.div`
  font-size: 18px;
  margin-top: 17px;
`;

export const FormInput = styled.div`
  padding: 11px 25px;
  background: transparent;
  border: 1px solid var(--color-white);
  line-height: 1;
  border-radius: 8px;

  input {
    width: 100%;
    background: none;
    font-size: 13.4px;
    color: var(--color-white);
    border: none;
    padding: 0;
    margin: 0;
    
  }
`;


export const SubmitButton = styled.button`
  display: block;
  width: 80%;
  color: var(--color-primary);
  background-color: transparent;
  font-weight: 600;
  font-size: 14px;
  margin: 0;
  padding: 14px 13px 12px 13px;
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

export const ForgotPassword = styled.a`
  text-align: center;
  margin-top: 10px;

  a {
    color: #868686;
    font-size: 12px;
    text-decoration: none;
    &:hover{
      color: var(--color-primary);
    }
  }
`;
export const BackgroundWrapper = styled.div`
  opacity: 0.3;
  background-image: url('/chessbackground.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;


