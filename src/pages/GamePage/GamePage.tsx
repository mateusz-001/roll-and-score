import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { PageWrapper } from '@/components/PageWrapper';
import { Paragraph } from '@/components/Paragraph';
import { Toggle } from '@/components/Toggle';
import { useGameStore } from '@/store/gameStore';
import { evaluateBottom } from '@/utils';
import { evaluateTop } from '@/utils/evaluateTop';

export const GamePage: React.FC = () => {
  const { game } = useGameStore();
  const hasPlayers = game && game?.players.length! > 0;
  const firstPlayerId = hasPlayers ? game!.players[0].id : null;

  const [showPoints, setShowPoints] = React.useState(false);
  const [isFirstThrow, setIsFirstThrow] = React.useState(false);

  const [currentPlayerId, setCurrentPlayerId] = React.useState<number | null>(null);
  const hasPlayerId = currentPlayerId !== null;
  const currentPlayerName = hasPlayerId
    ? game?.players.find(pl => pl.id === currentPlayerId)?.name
    : null;
  const nextPlayerName = hasPlayerId
    ? game?.players.find(pl => pl.id === currentPlayerId! + 1)?.name || game?.players[0].name || '-'
    : null;

  React.useEffect(() => {
    if (hasPlayers) {
      setCurrentPlayerId(firstPlayerId);
    }
  }, []);

  const dices = [2, 2, 2, 2, 2];

  console.log(
    'evaluateTop:',
    evaluateTop({
      availableCombinations: game?.players[0].game.top.combinations!,
      dices,
      currentBonusPoints: 0,
    }),
  );
  console.log(
    'evaluateBottom:',
    evaluateBottom({
      availableCombinations: game?.players[0].game.bottom.combinations!,
      dices,
      isFirstThrow,
    }),
  );

  return (
    <PageWrapper className="relative h-screen">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 w-full h-full max-h-[calc(100dvh-112px)] max-w-[calc(100%-24px)] p-4 bg-white rounded-lg shadow-card border-2 border-secondary overflow-y-auto mx-auto md:p-6 lg:max-w-2xl ">
        <header>
          <Heading level="h2" className="mb-3 md:mb-4 lg:mb-6">
            <span className="text-primary">{currentPlayerName}!</span>
            <br /> Czas ustrzelić parę punktów
          </Heading>
          <div className="flex max-sm:flex-col sm:gap-1 sm:justify-between">
            <Paragraph size="small">
              Runda:{' '}
              <span className="font-semibold">
                <span className="text-primary">{game?.round}</span> z 15
              </span>
            </Paragraph>
            <Paragraph size="small">
              Przygotuj się: <span className="text-primary font-semibold">{nextPlayerName}</span>
            </Paragraph>
          </div>
        </header>
        <main className="mt-3 flex flex-col gap-3 md:gap-4 md:mt-4 lg:mt-6 lg:gap-6">
          <section className="p-2 rounded-sm border-2 border-primary bg-slate-50 shadow-lg md:p-3">
            <Heading level="h4" className="text-primary mb-2 md:mb-3">
              Rzut
            </Heading>
            <div className="flex flex-col gap-3 md:gap-4">
              <div>
                <Paragraph size="small" className="italic">
                  Pierwsza kość:
                </Paragraph>
                <div className="flex gap-2 md:gap-3 lg:gap-4">
                  <Dice1 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice2 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice3 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice4 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice5 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice6 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                </div>
              </div>
              <div>
                <Paragraph size="small" className="italic">
                  Druga kość:
                </Paragraph>
                <div className="flex gap-2 md:gap-3 lg:gap-4">
                  <Dice1 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice2 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice3 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice4 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice5 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice6 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                </div>
              </div>
              <div>
                <Paragraph size="small" className="italic">
                  Trzecia kość:
                </Paragraph>
                <div className="flex gap-2 md:gap-3 lg:gap-4">
                  <Dice1 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice2 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice3 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice4 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice5 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice6 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                </div>
              </div>
              <div>
                <Paragraph size="small" className="italic">
                  Czwarta kość:
                </Paragraph>
                <div className="flex gap-2 md:gap-3 lg:gap-4">
                  <Dice1 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice2 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice3 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice4 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice5 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice6 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                </div>
              </div>
              <div>
                <Paragraph size="small" className="italic">
                  Piąta kość:
                </Paragraph>
                <div className="flex gap-2 md:gap-3 lg:gap-4">
                  <Dice1 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice2 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice3 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice4 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice5 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  <Dice6 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                </div>
              </div>
              <Toggle
                label="Rzuciłeś z ręki?"
                checked={isFirstThrow}
                className="!p-0"
                onCheckedChange={() => setIsFirstThrow(!isFirstThrow)}
              />
            </div>
          </section>
          <section className="p-2 rounded-sm border-2 border-primary bg-slate-50 shadow-lg md:p-3">
            <Heading level="h4" className="text-primary mb-2 md:mb-3">
              Wynik rzutu
            </Heading>
            <div>
              <Paragraph size="small" className="italic">
                Suma oczek:
              </Paragraph>
              <Paragraph size="large" className="font-semibold">
                0
              </Paragraph>
            </div>
            <Toggle
              label="Pokaż najlepsze propozycje punktowe"
              checked={showPoints}
              className="!p-0 mt-4 md:mt-4"
              onCheckedChange={() => setShowPoints(!showPoints)}
            />
          </section>
          <Button className="w-full" variant="primary" size="lg">
            Zatwierdź wynik
          </Button>
        </main>
      </div>
    </PageWrapper>
  );
};
