import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "fr",
    resources: {
      en: {
        Transition: {
          greeting: "Hello"
        },

      },
      fr: {
        Transition: {
          greeting: "bonjour"
        },
        
      },
      Ama: {
        Transition: {
          greeting: "ሰላም"
        },
      }
    }
 
  

  });

export default i18n;