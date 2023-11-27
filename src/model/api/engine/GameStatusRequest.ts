import {ColorType} from "../../game/ColorType";

export type GameStatusRequest = {
    boardState:string
    color:ColorType
    castles: string[]
}