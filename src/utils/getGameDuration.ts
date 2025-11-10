export const getGameDuration = (startedAt: string, endedAt: string): string => {
  console.log(startedAt, endedAt);
  const durationMs = new Date(endedAt).getTime() - new Date(startedAt).getTime();

  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};
