import {Move} from "../api/game/Move";

export type GameState = {
    boardState:string
    move: Move;
    castleTypes:string[]
    status:string
}