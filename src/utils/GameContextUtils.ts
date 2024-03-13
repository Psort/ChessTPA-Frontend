import {PieceModel} from "../model/pieces/PieceModel";
import {getPieTypeFromSymbol} from "../model/pieces/PieceType";
import {ColorType} from "../model/game/ColorType";
import {color} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
import {type} from "os";

export function boardToBoardState(board: PieceModel[][]): string {
    const boardStateRows: string[] = [];

    for (let i = 0; i < board.length; i++) {
        let row = '';
        let emptyCount = 0;

        for (let j = 0; j < board[i].length; j++) {
            const piece = board[i][j];

            if (!piece.type) {
                // Empty square
                emptyCount++;
            } else {
                // Piece present
                if (emptyCount > 0) {
                    row += emptyCount.toString();
                    emptyCount = 0;
                }
                const pieceSymbol = piece.color === ColorType.WHITE ? piece.type.toUpperCase() : piece.type.toLowerCase();
                row += pieceSymbol;
            }
        }

        if (emptyCount > 0) {
            row += emptyCount.toString();
        }

        boardStateRows.push(row);
    }

    return boardStateRows.join('/');
}

export function convertPosition(x: number | undefined, y: number | undefined) {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    if(x && y ){
        return `${letters[y-1]}${x}`;
    }
    return ""
}

export function boardStateToBoard(boardState:string) {
    const rows = boardState.split('/');
    const board: PieceModel[][] = [];
    //
    for (let i = 0; i < rows.length; i++) {
        const row: PieceModel[] = [];
        let j = 0;
        let x = i+1 ; // x coordinate starts from 1

        while (j < rows[i].length) {
            const char = rows[i][j];

            if (/[1-8]/.test(char)) {
                const emptySquares = parseInt(char, 10);
                for (let k = 0; k < emptySquares; k++) {
                    const y = row.length +1; // y coordinate starts from 1
                    row.push({ x: x, y: y, color: ColorType.WHITE, type: null, possibleMoves: []}); // or null, depending on your use case
                }

            } else {
                const piece = rows[i][j];
                const color = piece === piece.toUpperCase() ? ColorType.WHITE : ColorType.BLACK
                const type = getPieTypeFromSymbol(piece)as null;
                const y = row.length+1 ; // y coordinate starts from 1
                row.push({possibleMoves: [], x, y, color, type });
            }
            j++;
        }
        board.push(row);
    }

    return board;
}