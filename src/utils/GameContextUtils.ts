import {PieceModel} from "../model/pieces/PieceModel";

export function generateChessboard(pieces: PieceModel[]) {
    let board = "";
    for (let i = 1; i <= 8; i++) {
        let count = 0;
        for (let j = 1; j <= 8; j++) {
            const piece = pieces.find(piece => piece.x === i && piece.y === j);
            if (piece) {
                if (count !== 0) {
                    board += count;
                    count = 0;
                }
                const pieceSymbol = piece.color === "white" ? piece.type : piece.type.toLowerCase();
                board += pieceSymbol;
            } else {
                count++;
            }
        }

        if (count !== 0) {
            board += count;
        }

        if (i !== 8) {
            board += "/";
        }
    }
    return board;
}
export function convertPosition(x: number | undefined, y: number | undefined) {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    if(x && y ){
        return `${letters[y - 1]}${x}`;
    }
    return ""
}