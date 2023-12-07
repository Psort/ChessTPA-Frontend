import React, {useContext} from 'react';
import {CloseButton, ModalContent, ModalWrapper} from "./EndGameModal.styles";
import {GameContext} from "../../context/GameContext";
import {ColorType} from "../../model/game/ColorType";

interface EndGameModalProps {
    isOpen: boolean;
    onClose: () => void;
}


export const EndGameModal: React.FC<EndGameModalProps> = ({ isOpen, onClose }) => {
    const gameContext = useContext(GameContext)
    const winnerColor = gameContext.colorTurn === ColorType.WHITE ?ColorType.BLACK:ColorType.WHITE

    return (
        <ModalWrapper isOpen={isOpen}>
            <ModalContent>
                <h2>GAME OVER</h2>
                <h3>{winnerColor} WINS</h3>
                <p>REMATCH</p>
                <CloseButton onClick={onClose}>&times;</CloseButton>
            </ModalContent>
        </ModalWrapper>
    );
};