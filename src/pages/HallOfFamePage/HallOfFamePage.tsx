import React from 'react';
import { useTranslation } from 'react-i18next';

import { Heading } from '@/components/Heading';
import { PageCard } from '@/components/PageCard';
import { PageWrapper } from '@/components/PageWrapper';
import { Paragraph } from '@/components/Paragraph';
import { StatCard } from '@/components/StatCard';
import { useConfetti, useHallOfFameStats } from '@/hooks';
import { formatDate } from '@/utils';

import { Header } from './Header';

export const HallOfFamePage: React.FC = () => {
  const { t } = useTranslation('hof');

  const { stats } = useHallOfFameStats();
  const { burst } = useConfetti();

  const hasGames = (stats?.totalGames ?? 0) > 0;

  React.useEffect(() => {
    if (!hasGames) return;

    const timer = setTimeout(() => burst(), 300);

    return () => clearTimeout(timer);
  }, [hasGames]);

  if (!hasGames) {
    return (
      <PageWrapper className="relative h-screen">
        <PageCard>
          <Header totalGames={stats?.totalGames ?? 0} />
          <main className="mt-6">
            <Paragraph className="text-center">{t('no_players')}</Paragraph>
          </main>
        </PageCard>
      </PageWrapper>
    );
  }

  const {
    highestScoreEver,
    longestWinningStreak,
    mostBalancedGame,
    mostUnbalancedGame,
    topSectionKing,
    bottomSectionKing,
  } = stats!;

  const hasHighestScoreEver = highestScoreEver?.gameDate !== null;
  const hasLongestWinningStreak = longestWinningStreak?.streakLength !== null;
  const hasMostBalancedGame = mostBalancedGame?.scoreDifference !== null;
  const hasMostUnbalancedGame = mostUnbalancedGame?.scoreDifference !== null;
  const hasTopSectionKing = topSectionKing?.playerName !== null;
  const hasBottomSectionKing = bottomSectionKing?.playerName !== null;

  return (
    <PageWrapper className="relative h-screen">
      <PageCard>
        <Header totalGames={stats?.totalGames ?? 0} />
        <main className="grid grid-cols-1 gap-3 md:grid-cols-2 ">
          {hasHighestScoreEver && (
            <StatCard
              title={t('card_1_title')}
              description={t('card_1_description')}
              icon="🏆"
              className="col-span-1 md:col-span-2"
              delay={0.2}
            >
              <Heading level="h5" color="text-primary" className="flex gap-2 justify-center">
                {highestScoreEver?.playerName}{' '}
                <span className="!text-body-lg flex items-center px-1 rounded-sm bg-green-100 text-green-500 font-sans font-semibold">
                  {highestScoreEver?.score} {t('points')}
                </span>
              </Heading>
              <Paragraph className="mt-1 text-center italic !text-body-sm">
                {formatDate(highestScoreEver?.gameDate ?? '')}
              </Paragraph>
            </StatCard>
          )}
          {hasLongestWinningStreak && (
            <StatCard
              title={t('card_2_title')}
              description={t('card_2_description')}
              icon="🔥"
              delay={0.7}
            >
              <Heading level="h5" color="text-primary" className="flex gap-2 justify-center">
                {longestWinningStreak?.playerName}{' '}
                <span className="!text-body-lg flex items-center px-1 rounded-sm bg-green-100 text-green-500 font-sans font-semibold">
                  {longestWinningStreak?.streakLength} {t('wins')}
                </span>
              </Heading>
            </StatCard>
          )}
          {hasMostBalancedGame && (
            <StatCard
              title={t('card_3_title')}
              description={t('card_3_description')}
              icon="⚖️"
              delay={0.5}
            >
              <Heading level="h5" color="text-primary" className="flex gap-2 justify-center">
                <span className="!text-body-lg flex items-center px-1 rounded-sm bg-green-100 text-green-500 font-sans font-semibold">
                  {t('difference')}: {mostBalancedGame?.scoreDifference} pkt
                </span>
              </Heading>
              <Paragraph className="mt-1 text-center italic !text-body-sm">
                {formatDate(mostBalancedGame?.gameDate ?? '')} <br />
                {t('players_count')}:{' '}
                <span className="text-primary font-semibold">{mostBalancedGame?.playersCount}</span>
                <br />
                {t('winner')}:{' '}
                <span className="text-primary font-semibold">{mostBalancedGame?.winnerName}</span>
              </Paragraph>
            </StatCard>
          )}
          {hasMostUnbalancedGame && (
            <StatCard
              title={t('card_4_title')}
              description={t('card_4_description')}
              icon="⚖️"
              className="col-span-1 md:col-span-2"
              delay={0.5}
            >
              <Heading level="h5" color="text-primary" className="flex gap-2 justify-center">
                <span className="!text-body-lg flex items-center px-1 rounded-sm bg-green-100 text-green-500 font-sans font-semibold">
                  {t('difference')}: {mostUnbalancedGame?.scoreDifference} {t('points')}
                </span>
              </Heading>
              <Paragraph className="mt-1 text-center italic !text-body-sm">
                {formatDate(mostUnbalancedGame?.gameDate ?? '')} <br />
                {t('players_count')}:{' '}
                <span className="text-primary font-semibold">{mostBalancedGame?.playersCount}</span>
                <br />
                {t('winner')}:{' '}
                <span className="text-primary font-semibold">{mostBalancedGame?.winnerName}</span>
              </Paragraph>
            </StatCard>
          )}
          {hasTopSectionKing && (
            <StatCard
              title={t('card_5_title')}
              description={t('card_5_description')}
              icon="☝️"
              delay={0.4}
            >
              <Heading level="h5" color="text-primary" className="flex gap-2 justify-center">
                {topSectionKing?.playerName}{' '}
                <span className="!text-body-lg flex items-center px-1 rounded-sm bg-green-100 text-green-500 font-sans font-semibold">
                  {topSectionKing?.score} {t('points')}
                </span>
              </Heading>
              <Paragraph className="mt-1 text-center italic !text-body-sm">
                {formatDate(topSectionKing?.gameDate ?? '')}
              </Paragraph>
            </StatCard>
          )}
          {hasBottomSectionKing && (
            <StatCard
              title={t('card_6_title')}
              description={t('card_6_description')}
              icon="👇"
              delay={0.9}
            >
              <Heading level="h5" color="text-primary" className="flex gap-2 justify-center">
                {bottomSectionKing?.playerName}{' '}
                <span className="!text-body-lg flex items-center px-1 rounded-sm bg-green-100 text-green-500 font-sans font-semibold">
                  {bottomSectionKing?.score} {t('points')}
                </span>
              </Heading>
              <Paragraph className="mt-1 text-center italic !text-body-sm">
                {formatDate(bottomSectionKing?.gameDate ?? '')}
              </Paragraph>
            </StatCard>
          )}
        </main>
      </PageCard>
    </PageWrapper>
  );
};
