import { z } from 'zod';

import type { Game } from '@/types/game';

const topCombinationSchema = z.object({
  isPassed: z.boolean().nullable(),
  bonus: z.number().finite(),
  score: z.number().finite(),
});

const bottomCombinationSchema = z.object({
  isPassed: z.boolean().nullable(),
  isFirstThrow: z.boolean(),
  score: z.number().finite(),
});

const playerSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().trim().min(1),
  game: z.object({
    top: z.object({
      combinations: z.object({
        one: topCombinationSchema,
        two: topCombinationSchema,
        three: topCombinationSchema,
        four: topCombinationSchema,
        five: topCombinationSchema,
        six: topCombinationSchema,
      }),
      bonus: z.number().finite(),
      score: z.number().finite(),
    }),
    bottom: z.object({
      combinations: z.object({
        pair: bottomCombinationSchema,
        doublePair: bottomCombinationSchema,
        triple: bottomCombinationSchema,
        quadruple: bottomCombinationSchema,
        full: bottomCombinationSchema,
        smallStraight: bottomCombinationSchema,
        largeStraight: bottomCombinationSchema,
        poker: bottomCombinationSchema,
        chance: bottomCombinationSchema,
      }),
      score: z.number().finite(),
    }),
    overallScore: z.number().finite(),
  }),
});

export const gameSchema = z
  .object({
    id: z.union([z.string().min(1), z.number()]),
    players: z.array(playerSchema).min(2).max(10),
    placement: z.array(
      z.object({
        id: z.number().int().positive(),
        name: z.string().trim().min(1),
        score: z.number().finite(),
      }),
    ),
    round: z.number().int().min(1),
    activePlayer: z.object({
      id: z.number().int().positive(),
      name: z.string().trim().min(1),
      index: z.number().int().min(0),
    }),
    maxRounds: z.number().int().positive(),
    isFinished: z.boolean(),
    startedAt: z.string().min(1),
    endedAt: z.string().min(1).nullable(),
  })
  .superRefine((game, ctx) => {
    const activePlayer = game.players[game.activePlayer.index];

    if (!activePlayer || activePlayer.id !== game.activePlayer.id) {
      ctx.addIssue({
        code: 'custom',
        path: ['activePlayer'],
        message: 'Active player does not match the player list',
      });
    }

    if (game.round > game.maxRounds) {
      ctx.addIssue({
        code: 'custom',
        path: ['round'],
        message: 'Round cannot exceed maxRounds',
      });
    }
  });

export const parseGame = (value: unknown): Game | null => {
  const result = gameSchema.safeParse(value);

  return result.success ? (result.data as Game) : null;
};
