import React from 'react';

import { Button } from '@/components/Button';
import { PageWrapper } from '@/components/PageWrapper';
import { useGameStore } from '@/store/gameStore';
import { BottomKey, TopKey } from '@/types/player';
import { AvailableBottom, evaluateBottom, findCanBeSetToNull } from '@/utils';
import { AvailableTop, evaluateTop } from '@/utils/evaluateTop';

import { DicesPick } from './DicesPick';
import { FinalPlacements } from './FinalPlacements';
import { Header } from './Header';
import { MissingCombinations } from './MissingCombinations';
import { Results } from './Results';

export type AvailableCombinations = {
  top: AvailableTop[] | [];
  bottom: AvailableBottom[] | [];
};

export const GamePage: React.FC = () => {
  const { game, setTopCell, setBottomCell, setActivePlayer, nextRound, finishGame } =
    useGameStore();
  const { activePlayer, players } = game!;

  const playersCount = game?.players.length ?? 0;
  const hasPlayers = game && playersCount > 0;
  const hasNextPlayer = activePlayer.index === playersCount - 1 ? false : true;
  const activePlayerData = game!.players[activePlayer.index];

  const isFinalRound = game?.round === game?.maxRounds;

  const [showFinalResults, setShowFinalResults] = React.useState(false);
  const [showPoints, setShowPoints] = React.useState(false);
  const [isFirstThrow, setIsFirstThrow] = React.useState(false);
  const [selectedCombination, setSelectedCombination] = React.useState<TopKey | BottomKey | null>(
    null,
  );

  const [selectedDices, setSelectedDices] = React.useState<(number | null)[]>([]);
  const filteredDices = selectedDices.filter((dice): dice is number => dice !== null);

  const [availableCombinations, setAvailableCombinations] = React.useState<AvailableCombinations>({
    top: [],
    bottom: [],
  });
  const hasTopAvailable = availableCombinations.top.length > 0;
  const hasBottomAvailable = availableCombinations.bottom.length > 0;
  const hasAvailableCombinations = hasTopAvailable || hasBottomAvailable;

  const combinationsCanBeSetToNull = findCanBeSetToNull({
    playerId: activePlayerData.id,
    game: game!,
  });

  const handleToggleShowPoints = () => {
    setShowPoints(prev => !prev);
  };

  const handleToggleFirstThrow = () => {
    setIsFirstThrow(prev => !prev);
  };

  const handleSwitchToNextPlayer = () => {
    if (!hasPlayers || !selectedCombination) return;

    const findCombination = [...availableCombinations.top, ...availableCombinations.bottom].find(
      combo => combo.combination === selectedCombination,
    );

    if (!hasAvailableCombinations) {
      const isSelectedTopCombination = Object.keys(activePlayerData.game.top.combinations).includes(
        selectedCombination,
      );

      if (isSelectedTopCombination) {
        setTopCell(activePlayerData.id, selectedCombination as TopKey, {
          score: 0,
          bonus: 0,
          isPassed: false,
        });
      } else {
        setBottomCell(activePlayerData.id, selectedCombination as BottomKey, {
          score: 0,
          isFirstThrow,
          isPassed: false,
        });
      }
    } else {
      if ('bonusPoints' in findCombination!) {
        setTopCell(activePlayerData.id, selectedCombination as TopKey, {
          score: findCombination.score,
          bonus: findCombination.bonusPoints as number,
          isPassed: true,
        });
      } else {
        setBottomCell(activePlayerData.id, selectedCombination as BottomKey, {
          score: findCombination!.score,
          isFirstThrow,
          isPassed: true,
        });
      }
    }

    if (isFinalRound && !hasNextPlayer) {
      finishGame();
      setShowFinalResults(true);

      return;
    }

    if (!hasNextPlayer) {
      nextRound();
      setActivePlayer(0);
    } else {
      setActivePlayer(activePlayer.index + 1);
    }

    setSelectedDices([]);
    setIsFirstThrow(false);
    setSelectedCombination(null);
  };

  const handleSetDices = (diceIndex: number | null, value: number | null) => {
    setSelectedDices(prev => {
      const newDices = [...prev];
      if (diceIndex !== null) {
        newDices[diceIndex] = value;
      }

      return newDices;
    });
  };

  React.useEffect(() => {
    if (filteredDices.length === 5) {
      const topCombinations = evaluateTop({
        availableCombinations: activePlayerData.game.top.combinations,
        dices: filteredDices,
        currentBonusPoints: activePlayerData.game.top.bonus || 0,
      });
      const bottomCombinations = evaluateBottom({
        availableCombinations: activePlayerData.game.bottom.combinations,
        dices: filteredDices,
        isFirstThrow,
      });

      setAvailableCombinations({
        top: topCombinations,
        bottom: bottomCombinations,
      });
    } else {
      setAvailableCombinations({
        top: [],
        bottom: [],
      });
    }
  }, [selectedDices, isFirstThrow, activePlayer.index]);

  React.useEffect(() => {
    setSelectedCombination(null);
  }, [availableCombinations.top, availableCombinations.bottom]);

  React.useEffect(() => {
    if (isFinalRound && !hasNextPlayer) {
      setShowFinalResults(true);
    }
  }, [isFinalRound, hasNextPlayer]);

  return (
    <PageWrapper className="relative h-screen">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 w-full h-full max-h-[calc(100dvh-112px)] max-w-[calc(100%-24px)] p-4 bg-white rounded-lg shadow-card border-2 border-secondary overflow-y-auto mx-auto md:p-6 lg:max-w-2xl ">
        {!showFinalResults && (
          <>
            <Header
              currentPlayerName={activePlayer.name || '-'}
              nextPlayerName={hasNextPlayer ? players[activePlayer.index + 1].name : '-'}
              currentRound={game?.round || 0}
            />
            <main className="mt-3 flex flex-col gap-3 md:gap-4 md:mt-4 lg:mt-6 lg:gap-6">
              <DicesPick
                selectedDices={selectedDices}
                handleSetDices={handleSetDices}
                isFirstThrow={isFirstThrow}
                handleToggleFirstThrow={handleToggleFirstThrow}
              />
              {filteredDices.length === 5 && (
                <>
                  <Results
                    showPoints={showPoints}
                    handleToggleShowPoints={handleToggleShowPoints}
                    availableCombinations={availableCombinations}
                    hasTopAvailable={hasTopAvailable}
                    hasBottomAvailable={hasBottomAvailable}
                    selectedCombination={selectedCombination}
                    setSelectedCombination={
                      setSelectedCombination as (value: string | null) => void
                    }
                    bonusPoints={activePlayerData.game.top.bonus || 0}
                    combinationsCanBeSetToNull={combinationsCanBeSetToNull}
                  />
                  <Button
                    className="w-full"
                    variant="primary"
                    size="lg"
                    onClick={handleSwitchToNextPlayer}
                    disabled={!selectedCombination}
                  >
                    {isFinalRound && !hasNextPlayer
                      ? 'Zakończ grę'
                      : hasNextPlayer && !isFinalRound
                        ? 'Przejdź do następnego gracza'
                        : 'Następna runda'}
                  </Button>
                </>
              )}
              {(hasTopAvailable || hasBottomAvailable) && (
                <MissingCombinations
                  availableCombinationsTop={combinationsCanBeSetToNull.top}
                  availableCombinationsBottom={combinationsCanBeSetToNull.bottom}
                />
              )}
            </main>
          </>
        )}
        {showFinalResults && <FinalPlacements placement={game?.placement} />}
      </div>
    </PageWrapper>
  );
};
