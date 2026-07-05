import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { LanguageContext } from './languageContext';
import type { Language } from './languageContext';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = window.localStorage.getItem('wok-dragon-language');
    return stored === 'en' || stored === 'zh' ? stored : 'el';
  });

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    window.localStorage.setItem('wok-dragon-language', nextLanguage);
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === 'el' ? 'en' : language === 'en' ? 'zh' : 'el'),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
