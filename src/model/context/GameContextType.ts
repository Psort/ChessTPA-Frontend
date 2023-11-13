import {PieceModel} from "../pieces/PieceModel";
import {Coordinate} from "../api/game/Coordinate";
import {Game} from "../game/Game";

export type GameContextType = {
    game:Game|null
    gameModifier:(game:Game|null) => void
    promoteX:number
    colorTurn:string
    colorTurnModifier: (color: string) => void
    pieces:PieceModel[]
    piecesModifier: (pieces: PieceModel[]) => void
    currentPiece: PieceModel | null
    currentPieceModifier: (piece: PieceModel | null) => void
    possibleMoves:Coordinate[]|null
    possibleMovesModifier: (coordinates: Coordinate[] | null) => void
}