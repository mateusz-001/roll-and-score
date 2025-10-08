import 'i18next';
import common from '@/i18n/en/common.json';
import game from '@/i18n/en/game.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      game: typeof game;
    };
  }
}
