import {PieceType} from "./PieceType";
import {ColorType} from "../game/ColorType";

export type PieceModel = {
    type: PieceType|null;
    color:ColorType;
    x: number;
    y: number;
}