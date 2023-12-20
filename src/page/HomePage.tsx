import {Button, Section} from "../App.styles";
import React, {useCallback, useContext, useState} from "react";
import {GameContext} from "../context/GameContext";
import {QueueApi} from "../api/QueueApi";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../context/UserContext";
import {ColorType} from "../model/game/ColorType";

export const HomePage = () => {
    const userContext = useContext(UserContext)
    const gameContext = useContext(GameContext)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const searchGame = useCallback(async () => {
        try {
            setLoading(true)
            if(userContext.currentUser) {
                const response = await QueueApi.join(userContext.currentUser?.username)
                gameContext.gameModifier({id: response.data, history: [], players: [],actualColor:ColorType.WHITE})
                setLoading(false)
                navigate(`/play/online/${response.data}`)
            }
        } catch (error: any) {
            setLoading(false)
        }
    }, [userContext.currentUser]);
    return (
        <Section>
            {!loading ? <Button onClick={searchGame}>PLAY ONLINE</Button> :
                <div>wait</div>}
        </Section>
    )
}