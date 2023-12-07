import {Button, Section} from "../App.styles";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {GameApi} from "../api/GameApi";
import {UserContext} from "../context/UserContext";
import {Game} from "../model/game/Game";
import {useNavigate} from "react-router-dom";


export const ListGamePage = () => {
    const userContext = useContext(UserContext)
    const navigate = useNavigate();
    const [games,setGames] = useState<Game[]>();
    const getGames = useCallback(async () => {
        try {
            if(userContext.currentUser) {
                const response = await GameApi.getAllActualGamesForUser(userContext.currentUser?.username)
                setGames(response.data)
            }
        } catch (error: any) {

        }
    }, [userContext.currentUser]);

    let buttonsGames = games?.flatMap((game, index) => {
        return (<Section style={{flexDirection:"column",gap:"1rem"}}>
                    <h1>atual games</h1>
                    <Button onClick={()=>navigate(`/play/online/${game.id}`)} key={game.id} >
                        {game.id}
                    </Button>
                </Section>
        );
    });

    useEffect(() => {
        getGames()
    }, [userContext.currentUser]);
    return(
        <Section>
            {buttonsGames}
        </Section>
    )
}