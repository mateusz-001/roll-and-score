import 'i18next';
import common from '@/i18n/pl/common.json';
import game from '@/i18n/pl/game.json';
import start from '@/i18n/pl/start.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      game: typeof game;
      start: typeof start;
    };
  }
}
