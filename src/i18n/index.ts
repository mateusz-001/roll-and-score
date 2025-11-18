import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enCommon from '@/i18n/en/common.json';
import enGame from '@/i18n/en/game.json';
import plCommon from '@/i18n/pl/common.json';
import plGame from '@/i18n/pl/game.json';
import plResults from '@/i18n/pl/results.json';
import plStart from '@/i18n/pl/start.json';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon, game: enGame, start: {}, results: {} },
      pl: { common: plCommon, game: plGame, start: plStart, results: plResults },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'pl'],
    defaultNS: 'common',
    ns: ['common', 'game', 'start'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'rollnscore:lang',
    },
  });

export default i18n;
