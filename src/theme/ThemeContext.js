import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [borderColor, setBorderColor] = useState('red'); // Default border color

  const lightTheme = {
    background: '#fff',
    text: '#000',
    buttonBackground: '#f4f4f4',
    borderColor,  // Use borderColor from state
  };

  const darkTheme = {
    background: '#333',
    text: '#fff',
    buttonBackground: '#444',
    borderColor,  // Use borderColor from state
  };

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark, setBorderColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
