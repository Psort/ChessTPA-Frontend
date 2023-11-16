import {GameState} from "./GameState";
import {Player} from "./Player";

export type Game = {
    id:string
    history:GameState[]
    players:Player[]
    actualColor:string
}