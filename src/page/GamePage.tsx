import {Container, Left, Right, Section} from "../App.styles";
import React, {useCallback, useContext, useEffect} from "react";
import {Board} from "../components/game/Board";
import {GameApi} from "../api/GameApi";
import {GameContext} from "../context/GameContext";
import {useParams} from "react-router-dom";
import {boardStateToBoard} from "../utils/GameContextUtils";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {AnalysisWindow} from "../components/game/AnalysisWindow";

export const GamePage = () => {
    const { gameId } = useParams();
    const gameContext = useContext(GameContext)

    const getGame = useCallback(async () => {
        try {
            const response = await GameApi.getGame(gameId)
            gameContext.gameModifier(response.data)
            console.log(response.data)
        } catch (error: any) {
            console.log(error)
        }
    }, []);

    useEffect(() => {
        const sock = new SockJS('http://localhost:8080/stomp');
        const client = Stomp.over(sock);
        client.debug  = function (){}
        const connectCallback = () => {

            client.subscribe(`/topic/messages/${gameId}`, (payload) => {
                const newMessage = JSON.parse(payload.body);
                if(newMessage && gameId) {
                        if(newMessage.id === gameId) {
                            gameContext.gameModifier(newMessage)
                        }
                }
            });
        };

        client.connect({}, connectCallback);

        return () => {
            client.disconnect(() => {
            });
        };
    }, []);

    useEffect(() => {
        getGame()
    }, []);
    return(
        <Section>
            <Container>
                <Left><AnalysisWindow /></Left>
                <Right> <Board /></Right>
            </Container>
        </Section>
    )
}