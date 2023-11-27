import {User} from "../../User";
import {GameState} from "../../game/GameState";
import {Player} from "../../game/Player";
import {ColorType} from "../../game/ColorType";


export type GameResponse = {
    id:string
    history:GameState[]
    players:Player[]
    actualColor:ColorType
}