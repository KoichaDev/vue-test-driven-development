import { createI18n } from 'vue-i18n';
import { langEnglish, langNorwegian } from './locales';

export const i18n = createI18n({
  locale: 'en',
  legacy: false,
  messages: {
    en: {
      ...langEnglish
    },
    no: {
      ...langNorwegian
    }
  }
});
