import {QueueType} from "./QueueType";

export type GameComputerRequest = {
    firstPlayerUsername:string
    secondPlayerUsername:string
    gameType:QueueType
}