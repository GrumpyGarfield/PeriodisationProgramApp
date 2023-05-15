import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import enums_en from "./en/enums.json";
import firebase_en from "./en/firebase.json";

const resources = {
  en: {
    enums: enums_en,
    firebase: firebase_en,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en", //default language
});

export default i18next;
