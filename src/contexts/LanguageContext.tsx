
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'english' | 'hindi' | 'kannada';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  english: {
    home: 'Home',
    features: 'Features',
    demo: 'Demo',
    government: 'Government Schemes',
    dashboard: 'Dashboard',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    welcome: 'Welcome to KisaanMitra',
    weather: 'Weather',
    marketplace: 'Marketplace',
    farmPlanner: 'Farm Planner',
    loans: 'Loans',
    settings: 'Settings',
    language: 'Language',
  },
  hindi: {
    home: 'होम',
    features: 'फीचर्स',
    demo: 'डेमो',
    government: 'सरकारी योजनाएँ',
    dashboard: 'डैशबोर्ड',
    signIn: 'साइन इन',
    signOut: 'साइन आउट',
    welcome: 'किसानमित्र में आपका स्वागत है',
    weather: 'मौसम',
    marketplace: 'बाज़ार',
    farmPlanner: 'खेत योजनाकार',
    loans: 'ऋण',
    settings: 'सेटिंग्स',
    language: 'भाषा',
  },
  kannada: {
    home: 'ಮುಖಪುಟ',
    features: 'ವೈಶಿಷ್ಟ್ಯಗಳು',
    demo: 'ಡೆಮೋ',
    government: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    signIn: 'ಸೈನ್ ಇನ್',
    signOut: 'ಸೈನ್ ಔಟ್',
    welcome: 'ಕಿಸಾನ್‌ಮಿತ್ರಕ್ಕೆ ಸುಸ್ವಾಗತ',
    weather: 'ಹವಾಮಾನ',
    marketplace: 'ಮಾರುಕಟ್ಟೆ',
    farmPlanner: 'ಕೃಷಿ ಯೋಜನಾಕಾರ',
    loans: 'ಸಾಲಗಳು',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    language: 'ಭಾಷೆ',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'english',
  setLanguage: () => {},
  translate: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get the saved language from localStorage
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'english'; // Default to English
  });

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const translate = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  useEffect(() => {
    // Update html lang attribute
    document.documentElement.lang = language === 'english' ? 'en' : language === 'hindi' ? 'hi' : 'kn';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
