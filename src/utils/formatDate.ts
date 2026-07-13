export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  if (!Number.isFinite(date.getTime())) return '—';

  return date.toLocaleDateString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
