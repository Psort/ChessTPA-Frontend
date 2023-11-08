import {PieceModel} from "../pieces/PieceModel";
import {Coordinate} from "../api/game/Coordinate";

export type GameContextType = {
    promoteX:number
    colorTurn:string,
    colorTurnModifier: (color: string) => void
    pieces:PieceModel[]
    piecesModifier: (pieces: PieceModel[]) => void
    currentPiece: PieceModel | null
    currentPieceModifier: (piece: PieceModel | null) => void
    possibleMoves:Coordinate[]|null
    possibleMovesModifier: (coordinates: Coordinate[] | null) => void
}