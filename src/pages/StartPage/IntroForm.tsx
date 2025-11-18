import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft, Dices, Plus, Trash } from 'lucide-react';
import React from 'react';
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { redirect } from 'react-router-dom';

import { AnimationFormScale } from '@/components/Animations';
import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { Input } from '@/components/Input';
import { Paragraph } from '@/components/Paragraph';
import { registerPlayersSchema } from '@/schemas';
import { useGameStore } from '@/store/gameStore';

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 10;

type PlayerOut = { id: number; name: string };
type FormValues = { players: { name: string }[] };

interface Props {
  handleSetShowForm: () => void;
}

export const IntroForm: React.FC<Props> = ({ handleSetShowForm }) => {
  const { t } = useTranslation(['start', 'common']);

  const initializeGame = useGameStore(state => state.initializeGame);

  const methods = useForm<FormValues>({
    resolver: zodResolver(registerPlayersSchema),
    mode: 'onChange',
    defaultValues: { players: Array.from({ length: MIN_PLAYERS }, () => ({ name: '' })) },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = methods;

  const {
    fields,
    append: addPlayer,
    remove: removePlayer,
  } = useFieldArray({ control, name: 'players' });

  const canAdd = fields.length < MAX_PLAYERS;
  const canRemove = fields.length > MIN_PLAYERS;

  const onSubmit: SubmitHandler<FormValues> = data => {
    const payload: PlayerOut[] = data.players.map((player, index) => ({
      id: index + 1,
      name: player.name.trim(),
    }));

    initializeGame(payload);
    reset();
    redirect('game');
  };

  const handleAdd = () => {
    if (!canAdd) return;

    addPlayer({ name: '' }, { shouldFocus: true });
  };

  const handleRemove = (index: number) => {
    if (!canRemove) return;

    removePlayer(index);
  };

  return (
    <AnimationFormScale>
      <Heading level="h2">{t('start:players_registration')}</Heading>
      <Paragraph size="small" className="italic !text-xs mt-1 md:mt-2">
        {t('start:players_add', { min: MIN_PLAYERS, max: MAX_PLAYERS })}
      </Paragraph>

      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-3 mt-4 md:gap-4 md:mt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <AnimatePresence initial={false}>
            {fields.map((f, index) => (
              <div key={f.id} className="flex gap-3 items-center">
                <Input
                  name={`players.${index}.name`}
                  control={control}
                  label={t('common:inputs.player_name.label', { number: index + 1 })}
                  placeholder={t('common:inputs.player_name.label', { number: index + 1 })}
                  required
                  rules={{ required: t('common:inputs.player_name.required') }}
                />
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemove(index)}
                  disabled={!canRemove}
                  title={
                    !canRemove ? t('common:buttons.min_players', { min: MIN_PLAYERS }) : undefined
                  }
                >
                  <Trash className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </AnimatePresence>

          <div className="flex justify-end">
            <Button
              type="button"
              className="w-min ml-auto mt-1"
              onClick={handleAdd}
              disabled={!canAdd}
              title={!canAdd ? t('common:buttons.max_players', { max: MAX_PLAYERS }) : undefined}
            >
              {t('common:buttons.add')} <Plus className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="mt-4 flex justify-between items-center md:mt-6">
            <Button size="md" variant="ghost" type="button" onClick={handleSetShowForm}>
              <ArrowLeft className="mr-2 h-5 w-5" />
              {t('common:buttons.back')}
            </Button>
            <Button size="md" variant="primary" type="submit" disabled={!isValid}>
              {t('common:buttons.start_game')}
              <Dices className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </AnimationFormScale>
  );
};
