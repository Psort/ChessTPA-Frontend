import {PieceModel} from "../pieces/PieceModel";
import {Coordinate} from "../api/engine/Coordinate";
import {GameResponse} from "../api/game/GameResponse";
import {Game} from "../game/Game";
import {GameState} from "../game/GameState";


export type GameContextType = {
    game:Game|null
    gameModifier:(game:Game|null) => void
    actualGameState:GameState|undefined
    promoteX:number
    colorTurn:string
    colorTurnModifier: (color: string) => void
    pieces:PieceModel[][]
    piecesModifier: (pieces: PieceModel[][]) => void
    currentPiece: PieceModel | null
    currentPieceModifier: (piece: PieceModel | null) => void
    possibleMoves:Coordinate[]|null
    possibleMovesModifier: (coordinates: Coordinate[] | null) => void
}