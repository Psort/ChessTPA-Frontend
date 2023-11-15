import {PieceType} from "./PieceType";

export type PieceModel = {
    type: PieceType|null;
    color:string;
    x: number;
    y: number;
}