import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { AnimationSlideUp } from '@/components/Animations';
import { AvailableCombinations } from '@/components/AvailableCombinations';
import { Button } from '@/components/Button';
import { DicesPick } from '@/components/DicesPick';
import { MissingCombinations } from '@/components/MissingCombinations';
import { PageCard } from '@/components/PageCard';
import { PageWrapper } from '@/components/PageWrapper';
import { useTurnFlow, useAvailableCombinations } from '@/hooks';
import { useGameStore } from '@/store/gameStore';
import { Game } from '@/types/game';
import { BottomKey, TopKey } from '@/types/player';
import { AvailableBottom, AvailableTop, findCanBeSetToNull } from '@/utils';

import { Header } from './Header';
import { FinalPlacements } from '../../components/FinalPlacements/FinalPlacements';

export type AvailableCombinationsType = {
  top: AvailableTop[] | [];
  bottom: AvailableBottom[] | [];
};

interface Props {
  game: Game;
}

export const GamePageContent: React.FC<Props> = ({ game }) => {
  const { t } = useTranslation('common');
  const { setTopCell, setBottomCell, setActivePlayer, nextRound, finishGame } = useGameStore();

  const [showFinalResults, setShowFinalResults] = React.useState(false);
  const [showPoints, setShowPoints] = React.useState(false);
  const [isFirstThrow, setIsFirstThrow] = React.useState(false);

  const [selectedDices, setSelectedDices] = React.useState<(number | null)[]>([]);
  const [selectedCombination, setSelectedCombination] = React.useState<TopKey | BottomKey | null>(
    null,
  );
  const filteredDices = selectedDices.filter((dice): dice is number => dice !== null);

  const { activePlayerData, isFinalRound, hasNextPlayer, goToNext } = useTurnFlow(game, {
    setTopCell,
    setBottomCell,
    setActivePlayer,
    nextRound,
    finishGame,
  });

  const playersCount = game.players.length;
  const hasPlayers = playersCount > 0;

  const nextPlayerName = hasNextPlayer ? game.players[game.activePlayer.index + 1].name : null;

  const availableCombinations = useAvailableCombinations(
    game,
    game.activePlayer.index,
    selectedDices,
    isFirstThrow,
  );

  const hasTopAvailable = availableCombinations.top.length > 0;
  const hasBottomAvailable = availableCombinations.bottom.length > 0;
  const hasAvailableCombinations = hasTopAvailable || hasBottomAvailable;

  const combinationsCanBeSetToNull = findCanBeSetToNull({
    playerId: activePlayerData.id,
    game,
  });

  const handleToggleShowPoints = () => setShowPoints(prev => !prev);
  const handleToggleFirstThrow = () => setIsFirstThrow(prev => !prev);

  const handleSetDices = (diceIndex: number | null, value: number | null) => {
    setSelectedDices(prev => {
      const newDices = [...prev];

      if (diceIndex !== null) newDices[diceIndex] = value;

      return newDices;
    });
  };

  const handleSwitchToNextPlayer = () => {
    if (!hasPlayers || !selectedCombination) return;

    const result = goToNext({
      selectedCombination,
      availableCombinations,
      isFirstThrow,
    });

    if (result === 'finished') {
      setShowFinalResults(true);

      return;
    }

    setSelectedDices([]);
    setIsFirstThrow(false);
    setSelectedCombination(null);
  };

  React.useEffect(() => {
    setSelectedCombination(null);
  }, [availableCombinations.top, availableCombinations.bottom]);

  React.useEffect(() => {
    if (game.round === game.maxRounds && !hasNextPlayer) {
      setShowFinalResults(true);
    }
  }, [game.round, game.maxRounds, hasNextPlayer]);

  return (
    <PageWrapper className="relative h-screen">
      <PageCard>
        {!showFinalResults && (
          <>
            <Header
              currentPlayerName={activePlayerData.name || '-'}
              nextPlayerName={nextPlayerName || '-'}
              currentRound={game.round || 0}
            />
            <main className="mt-3 flex flex-col gap-3 md:gap-4 md:mt-4 lg:mt-6 lg:gap-6">
              <DicesPick
                selectedDices={selectedDices}
                handleSetDices={handleSetDices}
                isFirstThrow={isFirstThrow}
                handleToggleFirstThrow={handleToggleFirstThrow}
              />
              {filteredDices.length === 5 && (
                <AnimationSlideUp>
                  <AvailableCombinations
                    showPoints={showPoints}
                    handleToggleShowPoints={handleToggleShowPoints}
                    availableCombinations={availableCombinations}
                    hasTopAvailable={hasTopAvailable}
                    hasBottomAvailable={hasBottomAvailable}
                    selectedCombination={selectedCombination}
                    setSelectedCombination={setSelectedCombination as () => void}
                    bonusPoints={activePlayerData.game.top.bonus || 0}
                    combinationsCanBeSetToNull={combinationsCanBeSetToNull}
                  />
                  <Button
                    className="w-full mt-3 md:mt-4 lg:mt-6"
                    variant="primary"
                    size="lg"
                    onClick={handleSwitchToNextPlayer}
                    disabled={!selectedCombination}
                  >
                    {isFinalRound && !hasNextPlayer
                      ? t('buttons.finish_game')
                      : hasNextPlayer && !isFinalRound
                        ? t('buttons.next_player')
                        : t('buttons.next_round')}
                  </Button>
                </AnimationSlideUp>
              )}
              {hasAvailableCombinations && (
                <MissingCombinations
                  availableCombinationsTop={combinationsCanBeSetToNull.top}
                  availableCombinationsBottom={combinationsCanBeSetToNull.bottom}
                />
              )}
            </main>
          </>
        )}
        <AnimatePresence mode="wait">
          {showFinalResults && (
            <AnimationSlideUp>
              <FinalPlacements placement={game.placement} />
            </AnimationSlideUp>
          )}
        </AnimatePresence>
      </PageCard>
    </PageWrapper>
  );
};
