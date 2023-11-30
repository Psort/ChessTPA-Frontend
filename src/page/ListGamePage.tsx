import {Section} from "../App.styles";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {GameApi} from "../api/GameApi";
import {UserContext} from "../context/UserContext";
import {ColorType} from "../model/game/ColorType";
import {ChessSquare} from "../components/game/ChessSquare";
import {Piece} from "../components/piece/Piece";
import {Game} from "../model/game/Game";
import {useNavigate} from "react-router-dom";


export const ListGamePage = () => {
    const userContext = useContext(UserContext)
    const navigate = useNavigate();
    const [games,setGames] = useState<Game[]>();
    const getGames = useCallback(async () => {
        try {
            if(userContext.currentUser) {
                const response = await GameApi.getAllGamesForUser(userContext.currentUser?.username)
                setGames(response.data)
            }
        } catch (error: any) {

        }
    }, [userContext.currentUser]);

    let buttonsGames = games?.flatMap((game, index) => {
        return (
            <button onClick={()=>navigate(`/play/online/${game.id}`)} key={game.id} >
                {game.id}
            </button>
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