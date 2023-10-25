import React, {createContext, useCallback, useEffect, useState} from "react";
import {GameContextType} from "../model/context/GameContextType";
import {PieceModel} from "../model/pieces/PieceModel";
import {deafoultPiecesSetUp} from "../model/pieces/DeafoultPiecesSetUp";
import {GameApi} from "../api/GameApi";
import {AuthApi} from "../api/AuthApi";


const defaultSetting: GameContextType = {
    pieces:deafoultPiecesSetUp,
    currentPiece: null,
    currentPieceModifier: (piece: PieceModel | null) => {},
    move:(x: number, y: number) => {},
    canMove: (x: number, y: number): boolean =>{return true}
}

export const GameContext = createContext<GameContextType>(defaultSetting)

export const GameContextProvider = ({ children }: React.PropsWithChildren) => {
    const [pieces ,setPieces] = useState(deafoultPiecesSetUp)
    const [currentPiece, setCurrentPiece] = useState<PieceModel | null>(null);
    const [board,setBoard] = useState("")
    const [moves,setMoves] = useState()
    const currentPieceModifier = (piece:PieceModel | null) => {
        setCurrentPiece(piece);
    }
    const move = (x: number, y: number) => {
        if (currentPiece) {
            setPieces(pieces.map(piece =>
                (piece.x === currentPiece.x && piece.y === currentPiece.y)
                    ? { ...piece, x, y } : piece));

            const piece = pieces.find(piece => piece.x == x && piece.y == y)
            if (piece){
                piece.color = currentPiece.color
                piece.type = currentPiece.type
                setPieces(pieces.filter(piece => !(piece.x == currentPiece.x && piece.y == currentPiece.y)))
            }
        }
    };

    function convertPosition(x: number | undefined, y: number | undefined) {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        if(x && y ){
            return `${letters[x - 1]}${y}`;
        }
        return ""
    }

    function canMove(x: number, y: number){
        setBoard(generateChessboard());
        // console.log(board)
        return x == 4 && y == 4;

    }
    const getMoves = useCallback(async () => {
        try {
            const moves = await GameApi.getPossibleMoves({
                boardState: board,
                piecePosition: convertPosition(currentPiece?.x, currentPiece?.y)
            });
            console.log("ds")
            console.log(moves.data)
            return true;
        } catch (error) {
            return false; // or handle the error and return accordingly
        }
    }, [board]);
    function generateChessboard() {
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

    useEffect(() => {
        getMoves()
    }, [getMoves,board]);
    return (
        <GameContext.Provider value={{canMove,pieces,currentPiece, currentPieceModifier,move}}> {children} </GameContext.Provider>
    )
}