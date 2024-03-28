
import React, {useContext, useEffect, useState} from "react";

import {ChatBoxContainer, Messages, SendButton, Text} from "./ChatBox.styles";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {useParams} from "react-router-dom";
import {sendMessageWithGameId} from "../../message/MessageSender";
import {UserContext} from "../../context/UserContext";
import {ChatBoxBody} from "../../model/game/ChatBoxBody";


export const ChatBox = () => {
    const { gameId } = useParams();
    const userContext = useContext(UserContext);
    const [message,setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState<ChatBoxBody[]>([]);
    useEffect(() => {
        const sock = new SockJS('http://localhost:8080/stomp');
        const client = Stomp.over(sock);
        client.debug  = function (){}
        const connectCallback = () => {

            client.subscribe(`/topic/messages/${gameId}`, (payload) => {
                const response = JSON.parse(payload.body);
                if(response && gameId) {
                    if(response.gameId == gameId){
                        setChatMessages(prevMessages => [...prevMessages, response]);
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

    const sendMessage = () => {
        const username = userContext.currentUser?.username
        console.log(message)
        if (gameId != null && message != "" && username ) {
            sendMessageWithGameId(gameId,username, message);
            setMessage("");
        }
    };

    return(
        <ChatBoxContainer>
            <Messages>
                {chatMessages.map(({username, message}, index) => (
                    <div key={index}>{username + ": "+ message}</div>
                ))}
            </Messages>
            <div style={{display: "flex",flexDirection:"row"}}> {/* Note the double curly braces for inline styles */}
                <Text onChange={(e) => setMessage(e.target.value)} value={message}/>
                <SendButton onClick={() => sendMessage()}/>
            </div>
        </ChatBoxContainer>
    )
}
