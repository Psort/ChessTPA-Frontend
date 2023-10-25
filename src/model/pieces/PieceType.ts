export const PiecesTypes = {
    PAWN: 'P' as const,
    KNIGHT: 'N' as const,
    BISHOP: 'B' as const,
    ROOK: 'R' as const,
    KING: 'K' as const,
    QUEEN: 'Q' as const,
};

// Type definition
export type PieceType = typeof PiecesTypes[keyof typeof PiecesTypes];