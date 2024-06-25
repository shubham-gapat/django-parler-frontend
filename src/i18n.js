import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Create Post": "Create Post",
      "Title": "Title",
      "Content": "Content",
      "Submit": "Submit",
      "Cancel": "Cancel"
    }
  },
  es: {
    translation: {
      "Create Product": "Crear Publicación",
      "Title": "Título",
      "Content": "Contenido",
      "Submit": "Enviar",
      "Cancel": "Cancelar"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;