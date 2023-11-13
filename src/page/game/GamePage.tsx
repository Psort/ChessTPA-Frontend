import {Section} from "../../App.styles";
import React, {useCallback, useContext, useEffect} from "react";
import {Board} from "../../components/board/Board";
import {GameApi} from "../../api/GameApi";
import {GameContext} from "../../context/GameContext";


export const GamePage = () =>{
    const gameContext = useContext(GameContext)

    const game = useCallback(async () => {
        try {
            const response = await GameApi.getGame(gameContext.game?.id)
            console.log(response.data)

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