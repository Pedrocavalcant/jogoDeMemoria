// context/ThemeContext.js
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('default');
  const [fontSize, setFontSize] = useState(16);

  const themes = {
    default: { background: '#e8f5e9', text: '#2e7d32' },
    daltonico: { background: '#ffffe0', text: '#000000' }, // exemplo de contraste
  };

  return (
    <ThemeContext.Provider value={{
      theme: themes[theme],
      setTheme,
      fontSize,
      setFontSize
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
