import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const sendGameWithGameId = (gameId: string) => {
    const client = Stomp.over(new SockJS('http://localhost:8080/stomp'));
    client.debug  = function (){}
    client.connect({}, () => {
        client.send(`/app/game/${gameId}`, {}, gameId);
        client.disconnect(() => {
        });
    });
};

export const sendMessageWithGameId = (gameId: string,username:string,message: string) => {
    const client = Stomp.over(new SockJS('http://localhost:8080/stomp'));
    client.debug  = function (){}
    client.connect({}, () => {
        client.send(`/app/messages/${gameId}`, {}, JSON.stringify({ gameId,username, message }));
        client.disconnect(() => {
        });
    });
};