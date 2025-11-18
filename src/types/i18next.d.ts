import 'i18next';
import common from '@/i18n/pl/common.json';
import game from '@/i18n/pl/game.json';
import hof from '@/i18n/pl/hof.json';
import results from '@/i18n/pl/results.json';
import settings from '@/i18n/pl/settings.json';
import start from '@/i18n/pl/start.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      game: typeof game;
      start: typeof start;
      results: typeof results;
      hof: typeof hof;
      settings: typeof settings;
    };
  }
}
