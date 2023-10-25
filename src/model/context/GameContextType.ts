import {PieceModel} from "../pieces/PieceModel";

export type GameContextType = {
    pieces:PieceModel[]
    currentPiece: PieceModel | null
    currentPieceModifier: (piece: PieceModel | null) => void
    move:(x: number, y: number) => void;
    canMove(x: number, y: number): boolean;
}