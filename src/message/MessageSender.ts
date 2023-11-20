import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const sendMessageWithGameId = (gameId: string) => {
    const client = Stomp.over(new SockJS('http://localhost:8080/stomp'));
    client.debug  = function (){}
    client.connect({}, () => {
        client.send(`/app/game/${gameId}`, {}, gameId);
        client.disconnect(() => {
        });
    });
};
