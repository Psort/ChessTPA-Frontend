import { PiecesTypes } from "./PieceType";
import {PieceModel} from "./PieceModel"; // Import PiecesTypes from the correct file

export const pieces: PieceModel[] = [
    //Black Piece
    {type: PiecesTypes.ROOK, color:"black", x: 1, y: 1},
    {type: PiecesTypes.KNIGHT, color:"black", x: 1, y: 2},
    {type: PiecesTypes.BISHOP, color:"black", x: 1, y: 3},
    {type: PiecesTypes.QUEEN, color:"black", x: 1, y: 4},
    {type: PiecesTypes.KING, color:"black", x: 1, y: 5},
    {type: PiecesTypes.BISHOP, color:"black", x: 1, y: 6},
    {type: PiecesTypes.KNIGHT, color:"black", x: 1, y: 7},
    {type: PiecesTypes.ROOK, color:"black", x: 1, y: 8},
    {type: PiecesTypes.PAWN, color:"black", x: 2, y: 1},
    {type: PiecesTypes.PAWN, color:"black", x: 2, y: 2},
    {type: PiecesTypes.PAWN, color:"black", x: 2, y: 3},
    {type: PiecesTypes.PAWN, color:"black", x: 2, y: 4},
    {type: PiecesTypes.PAWN, color:"black", x: 2, y: 5},
    {type: PiecesTypes.PAWN, color:"black", x: 2, y: 6},
    {type: PiecesTypes.PAWN, color:"black", x: 2, y: 7},
    {type: PiecesTypes.PAWN, color:"black", x: 2, y: 8},
    //White Piece
    {type: PiecesTypes.ROOK, color:"white", x: 8, y: 1},
    {type: PiecesTypes.KNIGHT, color:"white", x: 8, y: 2},
    {type: PiecesTypes.BISHOP, color:"white", x: 8, y: 3},
    {type: PiecesTypes.QUEEN, color:"white", x: 8, y: 4},
    {type: PiecesTypes.KING, color:"white", x: 8, y: 5},
    {type: PiecesTypes.BISHOP, color:"white", x: 8, y: 6},
    {type: PiecesTypes.KNIGHT, color:"white", x: 8, y: 7},
    {type: PiecesTypes.ROOK, color:"white", x: 8, y: 8},
    {type: PiecesTypes.PAWN, color:"white", x: 7, y: 1},
    {type: PiecesTypes.PAWN, color:"white", x: 7, y: 2},
    {type: PiecesTypes.PAWN, color:"white", x: 7, y: 3},
    {type: PiecesTypes.PAWN, color:"white", x: 7, y: 4},
    {type: PiecesTypes.PAWN, color:"white", x: 7, y: 5},
    {type: PiecesTypes.PAWN, color:"white", x: 7, y: 6},
    {type: PiecesTypes.PAWN, color:"white", x: 7, y: 7},
    {type: PiecesTypes.PAWN, color:"white", x: 7, y: 8},

];
