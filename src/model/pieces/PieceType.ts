export enum PieceType {
    PAWN = 'P',
    KNIGHT = 'N',
    BISHOP = 'B',
    ROOK = 'R',
    KING = 'K',
    QUEEN = 'Q',
}
export const getPieTypeFromSymbol = (symbol: string): PieceType | null => {
    const upperSymbol = symbol.toUpperCase();
    switch (upperSymbol) {
        case 'P':
            return PieceType.PAWN;
        case 'N':
            return PieceType.KNIGHT;
        case 'B':
            return PieceType.BISHOP;
        case 'R':
            return PieceType.ROOK;
        case 'K':
            return PieceType.KING;
        case 'Q':
            return PieceType.QUEEN;
        default:
            return null; // Invalid symbol
    }
};
