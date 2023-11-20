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
            console.log("RESPONSE Z FETCHA", response.data)
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
            client.subscribe(`/topic/messages/${gameId}`, (payload) => {
                const newMessage = JSON.parse(payload.body);
                if(newMessage && gameId) {
                        if(newMessage.id === gameId) {
                            gameContext.gameModifier(newMessage)
                            gameContext.colorTurnModifier(newMessage.actualColor)
                            const boardState= newMessage.history.at(newMessage.history.length - 1)?.boardState;
                            if (boardState){
                                gameContext.piecesModifier(boardStateToBoard(boardState))
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

    useEffect(() => {

    },[gameContext.game])
    return(
        <Section>
           <Board/>
        </Section>
    )
}