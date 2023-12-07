import {AnalysisWindowContainer} from "./AnalysisWindow.styles";
import {GameContext} from "../../context/GameContext";
import {useCallback, useContext, useEffect, useState} from "react";
import {GameApi} from "../../api/GameApi";
import {useParams} from "react-router-dom";

export const AnalysisWindow = () => {
const gameContext = useContext(GameContext)
const [movesHistory, setMovesHistory] = useState<string[]>([]);
const { gameId } = useParams();

    useEffect(() => {
        const endingCoordinates = gameContext.lastMove?.endingCoordinates;
        console.log(gameContext.lastMove)
        if (endingCoordinates) {
            setMovesHistory(prevMovesHistory => [...prevMovesHistory, endingCoordinates]);
        }
    }, [gameContext.lastMove]);

    const getMoves = useCallback(async () => {
        try {
            const response = await GameApi.getMovesHistory(gameId)
            console.log(response.data)
            setMovesHistory(response.data)
        } catch (error: any) {
            console.log(error)
        }
    }, []);

    useEffect(() => {
        getMoves()
    }, [])

    return(
        <>
            <AnalysisWindowContainer>
                {movesHistory.map((coordinates, index) => (
                    <div key={index}>{coordinates}</div>
                ))}
            </AnalysisWindowContainer>
        </>
    )
}