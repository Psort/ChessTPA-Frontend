import {PieceModel} from "../pieces/PieceModel";
import {Coordinate} from "../api/engine/Coordinate";
import {GameResponse} from "../api/game/GameResponse";
import {Game} from "../game/Game";
import {GameState} from "../game/GameState";
import {ColorType} from "../game/ColorType";
import {Move} from "../api/game/Move";


export type GameContextType = {
    blockAction:boolean
    blockActionModifier:(blockAction:boolean)=> void
    game:Game|null
    gameModifier:(game:Game|null) => void
    actualGameState:GameState|undefined
    promoteX:number
    colorTurn:ColorType
    colorTurnModifier: (color: ColorType) => void
    pieces:PieceModel[][]
    piecesModifier: (pieces: PieceModel[][]) => void
    currentPiece: PieceModel | null
    currentPieceModifier: (piece: PieceModel | null) => void
    possibleMoves:Coordinate[]|null
    possibleMovesModifier: (coordinates: Coordinate[] | null) => void
    getCurrentUserColor:()=> ColorType
}