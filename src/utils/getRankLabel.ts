export const getRankLabel = (rank: number, medals: string[]): string =>
  rank >= 1 && rank <= 3 ? medals[rank - 1] : `${rank}.`;
