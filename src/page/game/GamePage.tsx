import {Section} from "../../App.styles";
import React, {useCallback, useContext, useEffect} from "react";
import {Board} from "../../components/board/Board";
import {GameApi} from "../../api/GameApi";
import {GameContext} from "../../context/GameContext";
import {useParams} from "react-router-dom";
import {boardStateToBoard} from "../../utils/GameContextUtils";


export const GamePage = () => {
    const { gameId } = useParams();
    const gameContext = useContext(GameContext)

    const getGame = useCallback(async () => {
        try {
            const response = await GameApi.getGame(gameId)
            gameContext.gameModifier(response.data)
            const boardState= response.data.history.at(response.data.history.length - 1)?.boardState;
            if (boardState){
                gameContext.piecesModifier(boardStateToBoard(boardState))
            }
        } catch (error: any) {
            console.log(error)
        }
    }, []);
    useEffect(() => {
        getGame()
    }, []);

    return(
        <Section>
           <Board/>
        </Section>
    )
}