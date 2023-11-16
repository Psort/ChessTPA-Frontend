import {User} from "../../User";
import {GameState} from "../../game/GameState";
import {Player} from "../../game/Player";


export type GameResponse = {
    id:string
    history:GameState[]
    players:Player[]
    actualColor:string
}