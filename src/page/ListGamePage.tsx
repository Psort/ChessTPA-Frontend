import {Section} from "../App.styles";
import React, {useCallback, useContext, useEffect} from "react";
import {Board} from "../components/game/Board";
import {GameApi} from "../api/GameApi";
import {GameContext} from "../context/GameContext";
import {useParams} from "react-router-dom";
import {boardStateToBoard} from "../utils/GameContextUtils";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {UserContext} from "../context/UserContext";
import {QueueApi} from "../api/QueueApi";
import {ColorType} from "../model/game/ColorType";

export const ListGamePage = () => {
    // const { gameId } = useParams();
    const userContext = useContext(UserContext)

    const getGames = useCallback(async () => {
        try {
            if(userContext.currentUser) {
                const response = await GameApi.getAllGamesForUser(userContext.currentUser?.username)
                console.log(response.data)
                // gameContext.gameModifier({id: response.data, history: [], players: [],actualColor:ColorType.WHITE})
                // console.log(response.data)
                // navigate(`/play/online/${response.data}`)
                // setLoading(false)
            }
        } catch (error: any) {

        }
    }, [userContext.currentUser]);



    useEffect(() => {
        getGames()
    }, [userContext.currentUser]);
    return(
        <Section>
            {userContext.currentUser?.username}
        </Section>
    )
}