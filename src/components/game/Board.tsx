import {BoardContainer} from "./Board.styles";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Piece} from "./Piece";
import {ChessSquare} from "./ChessSquare";
import {GameContext} from "../../context/GameContext";
import {UserContext} from "../../context/UserContext";
import {ColorType} from "../../model/game/ColorType";
import {EndGameModal} from "../modal/EndGameModal";
import {useNavigate} from "react-router-dom";
import {EngineApi} from "../../api/EngineApi";
import {PossibleMoves} from "../../model/api/engine/PossibleMoves";


export const Board = () => {
    const gameContext = useContext(GameContext);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [possibleMoves, setPossibleMoves] = useState<PossibleMoves[]>();
    const [endGame, setEndGame] = useState(false)
    const playerColor = gameContext.game?.players.find(player=>player.username === userContext.currentUser?.username )?.color
    let spots: React.ReactElement[] =gameContext.pieces.flatMap((row, i) => {
            return row.map((piece, j) => {
                const color = (i + j) % 2 === 0 ? ColorType.WHITE : ColorType.BLACK;
                const possibleMovesForPiece = possibleMoves?.find(possibleMove =>
                    possibleMove.myPosition.x === piece.x-1 && possibleMove.myPosition.y === piece.y-1
                );
                return (
                    <ChessSquare x={i+1} y={j+1} color={color}  key={`${i}-${j}`} playerColor={playerColor??ColorType.WHITE}>
                        {piece.type  && <Piece color={piece.color} type={piece.type} x={piece.x} y={piece.y}  possibleMoves={possibleMovesForPiece?.possibleMoves}/>}
                    </ChessSquare>
                );
            });
        });

    const handleCloseModal = () => {
        setOpen(false);
        gameContext.gameModifier(null)
        navigate("/");
    };

    const getPossibleMoves = useCallback(async () =>{
        try {
            const response = await EngineApi.getPossibleMoves({
                boardState: gameContext.actualGameState?.boardState??"",
                playerColor:gameContext.colorTurn,
                castles: gameContext.actualGameState?.castleTypes??[]
            });
            setPossibleMoves(response.data)
        } catch (error: any) {
            console.log(error.response)
        }
        return true;
    },[gameContext.actualGameState,gameContext.colorTurn])

    useEffect(() => {
        if(endGame){
            setOpen(true)
        }
    }, [endGame])

    useEffect(() => {
        const gameStatus = gameContext.actualGameState?.status
        switch (gameStatus) {
            case "CHECKMATE":
                setEndGame(true)
                gameContext.blockActionModifier(true)
                break;
            case "PAT":
                setEndGame(true)
                gameContext.blockActionModifier(true)
                break;
            default:
        }
    }, [gameContext.actualGameState?.status]);
    useEffect(()=>{
        getPossibleMoves()
    },[gameContext.actualGameState])
    return(
        <>
        <BoardContainer  playerColor={playerColor??""}>
            <>{spots}</>
        </BoardContainer>
            <EndGameModal isOpen={open} onClose={handleCloseModal} />
        </>
    )
}
