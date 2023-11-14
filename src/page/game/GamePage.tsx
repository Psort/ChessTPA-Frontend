import {Section} from "../../App.styles";
import React, {useCallback, useContext, useEffect} from "react";
import {Board} from "../../components/board/Board";
import {GameApi} from "../../api/GameApi";
import {GameContext} from "../../context/GameContext";
import {useParams} from "react-router-dom";


export const GamePage = () => {
    const { gameId } = useParams();
    const gameContext = useContext(GameContext)

    const game = useCallback(async () => {
        try {
            const response = await GameApi.getGame(gameId)
            gameContext.gameModifier(response.data)

        } catch (error: any) {
            console.log(error)
        }
    }, [gameContext.game?.id]);
    useEffect(() => {
        game()
    }, []);
    return(
        <Section>
           <Board/>
        </Section>
    )
}