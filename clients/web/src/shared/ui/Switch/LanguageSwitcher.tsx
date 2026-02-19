// src/widgets/LanguageSwitcher/LanguageSwitcher.tsx
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';

const languages = [
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      {languages.map((lang) => (
        <Button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          variant={i18n.language === lang.code ? 'primary' : 'secondary'}
          size="s"
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
};