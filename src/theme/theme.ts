import { ThemeColors, AppTheme } from '../types/theme';

const lightColors: ThemeColors = {
  primary: '#007AFF',
  background: '#FFFFFF',
  card: '#F2F2F7',
  text: '#000000',
  border: '#C6C6C8',
  notification: '#FF3B30',
  secondaryText: '#8E8E93',
  searchBackground: '#F2F2F7',
  weatherCard: '#FFFFFF',
  shadow: '#000000',
};

const darkColors: ThemeColors = {
  primary: '#0A84FF',
  background: '#000000',
  card: '#1C1C1E',
  text: '#FFFFFF',
  border: '#38383A',
  notification: '#FF453A',
  secondaryText: '#8E8E93',
  searchBackground: '#1C1C1E',
  weatherCard: '#1C1C1E',
  shadow: '#000000',
};

export const lightTheme: AppTheme = {
  colors: lightColors,
  setTheme: () => {},
};

export const darkTheme: AppTheme = {
  colors: darkColors,
  setTheme: () => {},
}; 