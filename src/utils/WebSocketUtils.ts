import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {ACCESS_TOKEN} from "../constants/constants";

export const sendMessageWithGameId = (gameId: string) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    };
    const client = Stomp.over(new SockJS('http://localhost:8080/api/game/stomp', {
        transportOptions: {
            'xhr-streaming': {}
        }
    }));
    client.connect({headers: client.connectHeaders}, () => {
        client.send('/gameService/game', headers, JSON.stringify(gameId));
        client.disconnect(() => {
        });
    });
};