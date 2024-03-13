import {ColorType} from "../../game/ColorType";

export type MovesRequest = {
    boardState:string
    playerColor:ColorType
    castles: string[]
}