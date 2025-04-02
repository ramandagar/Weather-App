import React, { useState, useMemo } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WeatherScreen } from './src/screens/WeatherScreen';
import { useColorScheme } from 'react-native';
import { CustomTheme, ThemeMode } from './src/types/theme';

const Stack = createNativeStackNavigator();

const HEADER_COLORS = {
  light: '#007AFF',
  dark: '#1C1C1E',
} as const;

export default function App() {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  const theme = useMemo(() => {
    const baseTheme = isDark ? DarkTheme : DefaultTheme;
    const customTheme = baseTheme as CustomTheme;
    customTheme.setTheme = (mode: ThemeMode) => setIsDark(mode === 'dark');
    return customTheme;
  }, [isDark]);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Weather"
          component={WeatherScreen}
          options={{
            title: 'Weather App',
            headerStyle: {
              backgroundColor: isDark ? HEADER_COLORS.dark : HEADER_COLORS.light,
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
