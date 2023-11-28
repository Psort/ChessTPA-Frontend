import {Player} from "../../game/Player";

export type Move = {
    player: Player|null
    startingCoordinates:string
    endingCoordinates:string
}