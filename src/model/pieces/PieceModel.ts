import {PieceType} from "./PieceType";
import {ColorType} from "../game/ColorType";
import {Coordinate} from "../api/engine/Coordinate";

export type PieceModel = {
    type: PieceType|null;
    color:ColorType;
    x: number;
    y: number;
}