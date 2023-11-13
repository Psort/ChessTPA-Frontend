import {GameState} from "./GameState";
import {User} from "../User";

export type Game = {
    id:string
    history:GameState[]
    players:User[]
}