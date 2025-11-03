import React from 'react';

import { Button } from '@/components/Button';
import { PageWrapper } from '@/components/PageWrapper';
import { useGameStore } from '@/store/gameStore';
import { AvailableBottom, evaluateBottom, findCanBeSetToNull } from '@/utils';
import { AvailableTop, evaluateTop } from '@/utils/evaluateTop';

import { DicesPick } from './DicesPick';
import { Header } from './Header';
import { Results } from './Results';

export type AvailableCombinations = {
  top: AvailableTop[] | [];
  bottom: AvailableBottom[] | [];
};

export const GamePage: React.FC = () => {
  const { game } = useGameStore();
  const hasPlayers = game && game?.players.length! > 0;
  const firstPlayerId = hasPlayers ? game!.players[0].id : null;

  const [showPoints, setShowPoints] = React.useState(false);
  const [isFirstThrow, setIsFirstThrow] = React.useState(false);
  const [selectedCombination, setSelectedCombination] = React.useState<string | null>(null);

  const [selectedDices, setSelectedDices] = React.useState<(number | null)[]>([]);
  const filteredDices = selectedDices.filter((dice): dice is number => dice !== null);

  const [currentPlayerId, setCurrentPlayerId] = React.useState<number | null>(null);
  const hasPlayerId = currentPlayerId !== null;
  const currentPlayerName = hasPlayerId
    ? game?.players.find(pl => pl.id === currentPlayerId)?.name
    : null;
  const nextPlayerName = hasPlayerId
    ? game?.players.find(pl => pl.id === currentPlayerId! + 1)?.name || game?.players[0].name || '-'
    : null;

  const [availableCombinations, setAvailableCombinations] = React.useState<AvailableCombinations>({
    top: [],
    bottom: [],
  });
  const hasTopAvailable = availableCombinations.top.length > 0;
  const hasBottomAvailable = availableCombinations.bottom.length > 0;

  const combinationsCanBeSetToNull = findCanBeSetToNull({
    playerId: currentPlayerId!,
    game: game!,
  });

  React.useEffect(() => {
    if (hasPlayers) {
      setCurrentPlayerId(firstPlayerId);
    }
  }, []);

  const handleToggleShowPoints = () => {
    setShowPoints(prev => !prev);
  };

  const handleToggleFirstThrow = () => {
    setIsFirstThrow(prev => !prev);
  };

  const handleSwitchToNextPlayer = () => {
    if (!hasPlayerId || !hasPlayers) return;

    const currentIndex = game!.players.findIndex(player => player.id === currentPlayerId);
    const nextIndex = (currentIndex + 1) % game!.players.length;
    const nextPlayerId = game!.players[nextIndex].id;

    setCurrentPlayerId(nextPlayerId);
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
        availableCombinations: game?.players[0].game.top.combinations!,
        dices: filteredDices,
        currentBonusPoints: game?.players[0].game.top.bonus || 0,
      });
      const bottomCombinations = evaluateBottom({
        availableCombinations: game?.players[0].game.bottom.combinations!,
        dices: filteredDices,
        isFirstThrow: isFirstThrow,
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
  }, [selectedDices, isFirstThrow]);

  React.useEffect(() => {
    setSelectedCombination(null);
  }, [availableCombinations.top, availableCombinations.bottom]);

  return (
    <PageWrapper className="relative h-screen">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 w-full h-full max-h-[calc(100dvh-112px)] max-w-[calc(100%-24px)] p-4 bg-white rounded-lg shadow-card border-2 border-secondary overflow-y-auto mx-auto md:p-6 lg:max-w-2xl ">
        <Header
          currentPlayerName={currentPlayerName || '-'}
          nextPlayerName={nextPlayerName || '-'}
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
                setSelectedCombination={setSelectedCombination}
                bonusPoints={game?.players[0].game.top.bonus || 0}
                combinationsCanBeSetToNull={combinationsCanBeSetToNull}
              />
              <Button
                className="w-full"
                variant="primary"
                size="lg"
                onClick={handleSwitchToNextPlayer}
              >
                Zatwierdź wynik
              </Button>
            </>
          )}
        </main>
      </div>
    </PageWrapper>
  );
};
