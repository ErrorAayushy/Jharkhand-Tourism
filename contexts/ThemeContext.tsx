import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  primaryText: string;
  border: string;
  cardBackground: string;
  headerBackground: string;
  tabBackground: string;
  tabActiveText: string;
  tabInactiveText: string;
}

const lightTheme: ThemeColors = {
  background: '#f8fafc',
  surface: '#ffffff',
  text: '#1e293b',
  textSecondary: '#64748b',
  primary: '#2563eb',
  primaryText: '#ffffff',
  border: '#e5e7eb',
  cardBackground: '#ffffff',
  headerBackground: '#1e40af',
  tabBackground: '#ffffff',
  tabActiveText: '#2563eb',
  tabInactiveText: '#6b7280',
};

interface ThemeContextType {
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const colors = lightTheme;

  return (
    <ThemeContext.Provider value={{ colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}