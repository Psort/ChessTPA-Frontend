import {Move} from "./Move";

export type GameStateRequest = {
    gameId: string|undefined
    boardState: string
    move:Move
    gameStatus :string
}