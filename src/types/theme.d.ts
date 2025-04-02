import { Theme } from '@react-navigation/native';

export type ThemeMode = 'light' | 'dark';

export interface CustomTheme extends Theme {
  setTheme: (mode: ThemeMode) => void;
}

export interface ThemeColors {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  secondaryText: string;
  searchBackground: string;
  weatherCard: string;
  shadow: string;
}

export interface AppTheme {
  colors: ThemeColors;
  setTheme: (mode: ThemeMode) => void;
} 