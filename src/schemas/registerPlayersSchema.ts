import { z } from 'zod';

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 10;

export const registerPlayersSchema = z.object({
  players: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, 'Nazwa gracza jest wymagana')
          .transform(s => s.trim()),
      }),
    )
    .min(MIN_PLAYERS, `Minimum ${MIN_PLAYERS} graczy`)
    .max(MAX_PLAYERS, `Maksymalnie ${MAX_PLAYERS} graczy`),
});
