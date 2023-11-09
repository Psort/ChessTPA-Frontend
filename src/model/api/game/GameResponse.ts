import {User} from "../../User";

export type GameResponse = {
    id:string
    history:[]
    players:User[]
}