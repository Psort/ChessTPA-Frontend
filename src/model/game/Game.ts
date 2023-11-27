import {GameState} from "./GameState";
import {Player} from "./Player";
import {ColorType} from "./ColorType";

export type Game = {
    id:string
    history:GameState[]
    players:Player[]
    actualColor:ColorType
}