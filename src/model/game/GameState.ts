import {Move} from "../api/game/Move";
import {PossibleMoves} from "../api/engine/PossibleMoves";

export type GameState = {
    boardState:string
    move: Move;
    castleTypes:string[]
    possibleMoves: PossibleMoves[]
    status:string
    halfMovesCounter:number
    fullMoves: number
    enPassantPosition:string
}