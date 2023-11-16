import { ReactNode, createContext, useState } from 'react';

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const value: DarkModeContextType = { isDarkMode, toggleDarkMode };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};
