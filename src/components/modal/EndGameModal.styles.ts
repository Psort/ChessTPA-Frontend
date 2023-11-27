import styled from 'styled-components';

export const ModalWrapper = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  color: #ff66b2; 
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(255, 102, 178, 1.2);
  padding: 2rem;
  text-align: center;
  max-width: 15rem;
  width: 100%;
  position: relative;
`;

export const CloseButton = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-size: 1rem;
  cursor: pointer;
  color: #ff66b2;
  transition: color 0.3s;

  &:hover {
    color: #ff3385;
  }
`;
