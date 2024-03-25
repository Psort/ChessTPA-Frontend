import {Move} from "./Move";

export type GameStateRequest = {
    gameId: string|undefined
    move:Move
}