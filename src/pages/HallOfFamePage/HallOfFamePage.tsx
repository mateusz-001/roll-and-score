import React from 'react';

import { Heading } from '@/components/Heading';
import { PageCard } from '@/components/PageCard';
import { PageWrapper } from '@/components/PageWrapper';
import { Paragraph } from '@/components/Paragraph';
import { StatCard } from '@/components/StatCard';
import { useHallOfFameStats } from '@/hooks';
import { formatDate } from '@/utils';

import { Header } from './Header';

export const HallOfFamePage: React.FC = () => {
  const { stats } = useHallOfFameStats();

  const hasGames = (stats?.totalGames ?? 0) > 0;

  if (!hasGames) {
    return (
      <PageWrapper className="relative h-screen">
        <PageCard>
          <Header totalGames={stats?.totalGames ?? 0} />
          <main className="mt-6">
            <p className="text-center">Brak graczy w Hall of Fame.</p>
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
              title="Najwyższy wynik"
              description="Najwyższy wynik wszech czasów uzyskany w jednej grze"
              icon="🏆"
              className="col-span-1 md:col-span-2"
            >
              <Heading level="h5" color="text-primary" className="flex gap-2 justify-center">
                {highestScoreEver?.playerName}{' '}
                <span className="!text-body-lg flex items-center px-1 rounded-sm bg-green-100 text-green-500 font-sans font-semibold">
                  {highestScoreEver?.score} pkt
                </span>
              </Heading>
              <Paragraph className="mt-1 text-center italic !text-body-sm">
                {formatDate(highestScoreEver?.gameDate ?? '')}
              </Paragraph>
            </StatCard>
          )}
          {hasLongestWinningStreak && (
            <StatCard
              title="Najdłuższa seria zwycięstw"
              description="Najwięcej kolejnych zwycięstw w grach"
              icon="🔥"
            >
              <Heading level="h5" color="text-primary" className="flex gap-2 justify-center">
                {longestWinningStreak?.playerName}{' '}
                <span className="!text-body-lg flex items-center px-1 rounded-sm bg-green-100 text-green-500 font-sans font-semibold">
                  {longestWinningStreak?.streakLength} zwycięstw
                </span>
              </Heading>
            </StatCard>
          )}
          {hasMostBalancedGame && (
            <StatCard
              title="Najbardziej wyrównana gra"
              description="Gra z najmniejszą różnicą punktową między graczem o najwyższym i najniższym wynikiem"
              icon="⚖️"
            >
              <Heading level="h5" color="text-primary" className="flex gap-2 justify-center">
                <span className="!text-body-lg flex items-center px-1 rounded-sm bg-green-100 text-green-500 font-sans font-semibold">
                  Różnica: {mostBalancedGame?.scoreDifference} pkt
                </span>
              </Heading>
              <Paragraph className="mt-1 text-center italic !text-body-sm">
                {formatDate(mostBalancedGame?.gameDate ?? '')} <br />
                Liczba graczy:{' '}
                <span className="text-primary font-semibold">{mostBalancedGame?.playersCount}</span>
                <br />
                Zwycięzca:{' '}
                <span className="text-primary font-semibold">{mostBalancedGame?.winnerName}</span>
              </Paragraph>
            </StatCard>
          )}
          {hasMostUnbalancedGame && (
            <StatCard
              title="Najbardziej niewyrównana gra"
              description="Gra z największą różnicą punktową między graczem o najwyższym i najniższym wynikiem"
              icon="⚖️"
              className="col-span-1 md:col-span-2"
            >
              <Heading level="h5" color="text-primary" className="flex gap-2 justify-center">
                <span className="!text-body-lg flex items-center px-1 rounded-sm bg-green-100 text-green-500 font-sans font-semibold">
                  Różnica: {mostUnbalancedGame?.scoreDifference} pkt
                </span>
              </Heading>
              <Paragraph className="mt-1 text-center italic !text-body-sm">
                {formatDate(mostUnbalancedGame?.gameDate ?? '')} <br />
                Liczba graczy:{' '}
                <span className="text-primary font-semibold">{mostBalancedGame?.playersCount}</span>
                <br />
                Zwycięzca:{' '}
                <span className="text-primary font-semibold">{mostBalancedGame?.winnerName}</span>
              </Paragraph>
            </StatCard>
          )}
          {hasTopSectionKing && (
            <StatCard
              title="Król góry tabeli"
              description="Gracz z najwyższym wynikiem w górnej tabeli"
              icon="☝️"
            >
              <Heading level="h5" color="text-primary" className="flex gap-2 justify-center">
                {topSectionKing?.playerName}{' '}
                <span className="!text-body-lg flex items-center px-1 rounded-sm bg-green-100 text-green-500 font-sans font-semibold">
                  {topSectionKing?.score} pkt
                </span>
              </Heading>
              <Paragraph className="mt-1 text-center italic !text-body-sm">
                {formatDate(topSectionKing?.gameDate ?? '')}
              </Paragraph>
            </StatCard>
          )}
          {hasBottomSectionKing && (
            <StatCard
              title="Król sekcji dolnej"
              description="Gracz z najwyższym wynikiem w dolnej tabeli"
              icon="👇"
            >
              <Heading level="h5" color="text-primary" className="flex gap-2 justify-center">
                {bottomSectionKing?.playerName}{' '}
                <span className="!text-body-lg flex items-center px-1 rounded-sm bg-green-100 text-green-500 font-sans font-semibold">
                  {bottomSectionKing?.score} pkt
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
