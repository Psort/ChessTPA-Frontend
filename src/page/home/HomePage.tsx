import {Button, Section} from "../../App.styles";
import React, {useCallback, useContext, useState} from "react";
import {GameContext} from "../../context/GameContext";
import {QueueApi} from "../../api/QueueApi";
import {useNavigate} from "react-router-dom";

export const HomePage = () => {
    const gameContext = useContext(GameContext)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const searchGame = useCallback(async () => {
        try {
            setLoading(true)
            const response = await QueueApi.join("username")
            gameContext.idModifier(response.data)
            navigate("/game/online")
            setLoading(false)
        } catch (error: any) {
            // console.log(error)
            setLoading(false)
        }
    }, []);
    return (
        <Section>
            {!loading ? <Button onClick={searchGame}>Play</Button> :
                <div>wait</div>}
        </Section>
    )
}