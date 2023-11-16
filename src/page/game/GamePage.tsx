import {Section} from "../../App.styles";
import React, {useCallback, useContext, useEffect} from "react";
import {Board} from "../../components/board/Board";
import {GameApi} from "../../api/GameApi";
import {GameContext} from "../../context/GameContext";
import {useParams} from "react-router-dom";
import {boardStateToBoard} from "../../utils/GameContextUtils";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

export const GamePage = () => {
    const { gameId } = useParams();
    const gameContext = useContext(GameContext)

    const getGame = useCallback(async () => {
        try {
            const response = await GameApi.getGame(gameId)
            gameContext.gameModifier(response.data)
            gameContext.colorTurnModifier(response.data.actualColor)
            const boardState= response.data.history.at(response.data.history.length - 1)?.boardState;
            if (boardState){
                gameContext.piecesModifier(boardStateToBoard(boardState))
            }
        } catch (error: any) {
            console.log(error)
        }
    }, []);

    useEffect(() => {
        const sock = new SockJS('http://localhost:8080/stomp');
        const client = Stomp.over(sock);

        const connectCallback = () => {
            client.subscribe('/topic/messages', (payload) => {
                const newMessage = JSON.parse(payload.body);
                if(newMessage){
                    if(gameId){
                        if(newMessage.id.toString() === gameId) {
                            gameContext.gameModifier(newMessage)
                        }
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
           <Board/>
        </Section>
    )
}