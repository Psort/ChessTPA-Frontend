import {User} from "../../User";
import {GameState} from "../../game/GameState";


export type GameResponse = {
    id:string
    history:GameState[]
    players:User[]
}