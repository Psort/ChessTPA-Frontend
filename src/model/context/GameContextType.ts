import {PieceModel} from "../pieces/PieceModel";

export type GameContextType = {
    currentPiece: PieceModel | null
    currentPieceModifier: (piece: PieceModel | null) => void
}