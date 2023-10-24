export const PiecesTypes = {
    PAWN: 'PAWN' as const,
    KNIGHT: 'KNIGHT' as const,
    BISHOP: 'BISHOP' as const,
    ROOK: 'ROOK' as const,
    KING: 'KING' as const,
    QUEEN: 'QUEEN' as const,
};

// Type definition
export type PieceType = typeof PiecesTypes[keyof typeof PiecesTypes];