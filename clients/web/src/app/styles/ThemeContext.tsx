import React, { createContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes';
import { useThemeMode } from './useThemeMode';

interface IThemeContext {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, themeToggler } = useThemeMode();
  const themeMode = theme === 'dark' ? darkTheme : lightTheme;

  const value: IThemeContext = {
    theme: theme as 'light' | 'dark',
    toggleTheme: themeToggler,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={themeMode}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};