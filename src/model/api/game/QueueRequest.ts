import {QueueType} from "./QueueType";

export type QueueRequest = {
    username: string
    eloRating: number
    queueType: QueueType;
}