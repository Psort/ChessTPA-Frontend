import {BoardContainer} from "./Board.styles";
import React, {useContext} from "react";
import {Piece} from "../piece/Piece";
import {ChessSquare} from "./ChessSquare";
import {GameContext} from "../../context/GameContext";
import {UserContext} from "../../context/UserContext";
import {ColorType} from "../../model/game/ColorType";

export const Board = () => {
    const gameContext = useContext(GameContext);
    const userContext = useContext(UserContext);
    const playerColor = gameContext.game?.players.find(player=>player.username === userContext.currentUser?.username )?.color
    let spots: React.ReactElement[] =gameContext.pieces.flatMap((row, i) => {
            return row.map((piece, j) => {
                const color = (i + j) % 2 === 0 ? ColorType.WHITE : ColorType.BLACK;
                return (
                    <ChessSquare x={i+1} y={j+1} color={color}  key={`${i}-${j}`} playerColor={playerColor??ColorType.WHITE}>
                        {piece.type  && <Piece color={piece.color} type={piece.type} x={piece.x} y={piece.y} />}
                    </ChessSquare>
                );
            });
        });
    return(
        <BoardContainer  playerColor={playerColor??""}>
            {spots}
        </BoardContainer>
    )
}
