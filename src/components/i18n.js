import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import common_pl from '../translations/pl/common.json';
import common_en from '../translations/en/common.json';


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        common: common_en,
      },
      pl: {
        common: common_pl,
      },
    },
    lng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

const changeLng = (lng) => {
  i18next.changeLanguage(lng);
};

export default i18n;
