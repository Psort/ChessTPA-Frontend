import {AnalysisWindowContainer} from "./AnalysisWindow.styles";
import {GameContext} from "../../context/GameContext";
import {useContext, useEffect, useState} from "react";


export const AnalysisWindow = () => {
const gameContext = useContext(GameContext)
const [movesHistory, setMovesHistory] = useState<string[]>([]);

    useEffect(() => {
        const movesHistory = gameContext.game?.history
            .map(history=> history.move?.endingCoordinates)
            .filter(move => move !== undefined)
        if (movesHistory){
            setMovesHistory(movesHistory)
        }

    }, [gameContext.game]);


    return(
        <>
            <AnalysisWindowContainer>
                <div>
                    {movesHistory.map((coordinates, index) => (
                        <div key={index}>{coordinates}</div>
                    ))}
                </div>
            </AnalysisWindowContainer>
        </>
    )
}