import { z } from 'zod';

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 10;

export const registerPlayersSchema = z.object({
  players: z
    .array(
      z.object({
        name: z.string().trim().min(1, 'Nazwa gracza jest wymagana'),
      }),
    )
    .min(MIN_PLAYERS, `Minimum ${MIN_PLAYERS} graczy`)
    .max(MAX_PLAYERS, `Maksymalnie ${MAX_PLAYERS} graczy`)
    .superRefine((players, ctx) => {
      const seenNames = new Set<string>();

      players.forEach((player, index) => {
        const normalizedName = player.name.toLocaleLowerCase();

        if (seenNames.has(normalizedName)) {
          ctx.addIssue({
            code: 'custom',
            path: [index, 'name'],
            message: 'Nazwy graczy muszą być unikalne',
          });
        }

        seenNames.add(normalizedName);
      });
    }),
});
