import { ArrowLeft, Dices, Plus, Trash } from 'lucide-react';
import React from 'react';
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { Input } from '@/components/Input';
import { Paragraph } from '@/components/Paragraph';

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 10;

type PlayerOut = { id: number; name: string };
type FormValues = { players: { name: string }[] };

interface Props {
  handleSetShowForm: () => void;
}

export const IntroForm: React.FC<Props> = ({ handleSetShowForm }) => {
  const methods = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: { players: Array.from({ length: MIN_PLAYERS }, () => ({ name: '' })) },
  });

  const { control, handleSubmit, setFocus } = methods;
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

    console.log(payload);
  };

  const handleAdd = () => {
    if (!canAdd) return;

    addPlayer({ name: '' });
    queueMicrotask(() => setFocus(`players.${fields.length}.name` as const));
  };

  const handleRemove = (index: number) => {
    if (!canRemove) return;

    removePlayer(index);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-card border-2 border-secondary max-w-2xl mx-auto md:p-6">
      <Heading level="h2">Rejestracja graczy</Heading>
      <Paragraph size="small" className="italic !text-xs mt-1 md:mt-2">
        Dodaj od {MIN_PLAYERS} do {MAX_PLAYERS} graczy.
      </Paragraph>

      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-3 mt-4 md:gap-4 md:mt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {fields.map((f, index) => (
            <div key={f.id} className="flex gap-3 items-center">
              <Input
                name={`players.${index}.name`}
                control={control}
                label={`Nazwa Gracza ${index + 1}`}
                placeholder={`Nazwa gracza ${index + 1}`}
                required
                rules={{ required: 'Nazwa gracza jest wymagana' }}
              />
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={() => handleRemove(index)}
                disabled={!canRemove}
                title={!canRemove ? `Minimalna liczba graczy to ${MIN_PLAYERS}` : undefined}
              >
                <Trash className="h-5 w-5" />
              </Button>
            </div>
          ))}

          <div className="flex justify-end">
            <Button
              type="button"
              className="w-min ml-auto mt-1"
              onClick={handleAdd}
              disabled={!canAdd}
              title={!canAdd ? `Maksymalna liczba graczy to ${MAX_PLAYERS}` : undefined}
            >
              Dodaj <Plus className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="mt-4 flex justify-between items-center md:mt-6">
            <Button size="md" variant="ghost" type="button" onClick={handleSetShowForm}>
              <ArrowLeft className="mr-2 h-5 w-5" />
              Powrót
            </Button>
            <Button size="md" variant="primary" type="submit">
              Rozpocznij grę
              <Dices className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
