import {Move} from "./Move";
import {PieceType} from "../../pieces/PieceType";

export type GameStateRequest = {
    gameId: string|undefined
    move:Move
    newPawnType: string
}