export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  if (!Number.isFinite(date.getTime())) return '—';

  const lang =
    typeof window !== 'undefined' ? window.localStorage.getItem('rollnscore:lang') : null;
  const locale = lang === 'pl' ? 'pl-PL' : lang === 'en' ? 'en-US' : undefined;

  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
