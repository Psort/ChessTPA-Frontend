import {
    MatchmakingText,
    PlayAccordion,
    PlayAccordionDetails,
    PlayAccordionSummary,
    PlayButton,
    PlayTypography,
    Section, SpinnerLowerDiv, SpinnerUpperDiv
} from "../App.styles";
import React, {useCallback, useContext, useState} from "react";
import {GameContext} from "../context/GameContext";
import {QueueApi} from "../api/QueueApi";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../context/UserContext";
import {ColorType} from "../model/game/ColorType";
import {QueueType} from "../model/api/game/QueueType";
import {CircularProgress, Stack} from "@mui/material";

export const HomePage = () => {
    const userContext = useContext(UserContext)
    const gameContext = useContext(GameContext)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const searchGame = useCallback(async (queueType: QueueType) => {
        try {
            setLoading(true)
            if(userContext.currentUser) {
                const response = await QueueApi.join({
                    username :userContext.currentUser?.username,
                    eloRating: userContext.currentUser.eloRating,
                    queueType: queueType
                })
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
            {loading ? (
                <SpinnerUpperDiv>
                    <div>
                        <MatchmakingText>Looking for opponent...</MatchmakingText>
                    </div>
                    <SpinnerLowerDiv>
                        <CircularProgress />
                    </SpinnerLowerDiv>
                </SpinnerUpperDiv>
            ) : (
                <PlayAccordion>
                    <PlayAccordionSummary>
                        <PlayTypography><h2>Select game mode</h2></PlayTypography>
                    </PlayAccordionSummary>
                    <PlayAccordionDetails>
                        <Stack spacing={1}>
                            <PlayButton onClick={() => { searchGame(QueueType.ONEMINQUEUE) }}>ONE MINUTE GAME</PlayButton>
                            <PlayButton onClick={() => { searchGame(QueueType.THREEMINQUEUE) }}>THREE MINUTE GAME</PlayButton>
                            <PlayButton onClick={() => { searchGame(QueueType.FIVEMINQUEUE) }}>FIVE MINUTE GAME</PlayButton>
                            <PlayButton onClick={() => { searchGame(QueueType.TENMINQUEUE) }}>TEN MINUTE GAME</PlayButton>
                            <PlayButton onClick={() => { searchGame(QueueType.UNLIMITEDQUEUE) }}>REGULAR GAME</PlayButton>
                        </Stack>
                    </PlayAccordionDetails>
                </PlayAccordion>
            )}
        </Section>
    )
}