import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SearchInput } from '../components/SearchInput';
import { WeatherCard } from '../components/WeatherCard';
import { useWeatherViewModel } from '../viewModels/weatherViewModel';
import { lightTheme, darkTheme } from '../theme/theme';
import { WeatherService } from '../services/weatherService';
import { MyToast } from '../utils/toast';
import { CustomTheme, ThemeMode } from '../types/theme';

const SWITCH_COLORS = {
  track: {
    false: '#767577',
    true: '#81b0ff',
  },
  thumb: {
    light: '#f4f3f4',
    dark: '#007AFF',
  },
} as const;

export const WeatherScreen: React.FC = () => {
  const { dark, setTheme } = useTheme() as CustomTheme;
  const [searchText, setSearchText] = useState('');
  const { state, fetchWeather, refreshWeather } = useWeatherViewModel();

  useEffect(() => {
    loadCachedData();
  }, []);

  useEffect(() => {
    if (state.error?.message) {
      MyToast(state.error.message);
    }
  }, [state.error]);

  const loadCachedData = useCallback(async () => {
    try {
      const cachedData = await WeatherService.getCachedWeather();
      if (cachedData?.city) {
        setSearchText(cachedData.city);
      }
    } catch (error) {
      // Silent fail
    }
  }, []);

  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
    if (text.trim()) {
      fetchWeather(text.trim());
    }
  }, [fetchWeather]);

  const handleClear = useCallback(() => setSearchText(''), []);

  const handleRefresh = useCallback(async () => {
    if (state.data?.city) {
      await refreshWeather();
    }
  }, [state.data?.city, refreshWeather]);

  const handleThemeChange = useCallback((value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  }, [setTheme]);

  const theme = dark ? darkTheme : lightTheme;
  const containerStyle = [styles.container, { backgroundColor: theme.colors.background }];
  const offlineTextStyle = [styles.offlineText, { color: theme.colors.secondaryText }];
  const switchContainerStyle = [styles.switchContainer, { backgroundColor: theme.colors.card }];
  const switchTextStyle = { color: theme.colors.text };

  return (
    <View style={containerStyle}>
      <View style={switchContainerStyle}>
        <Text style={switchTextStyle}>Dark Mode</Text>
        <Switch
          value={dark}
          onValueChange={handleThemeChange}
          trackColor={SWITCH_COLORS.track}
          thumbColor={dark ? SWITCH_COLORS.thumb.dark : SWITCH_COLORS.thumb.light}
        />
      </View>
      <SearchInput
        value={searchText}
        onChangeText={handleSearch}
        onClear={handleClear}
        loading={state.loading}
      />
      {state.data && (
        <WeatherCard
          data={state.data}
          onRefresh={handleRefresh}
          refreshing={state.loading}
        />
      )}
      {state.isOffline && (
        <Text style={offlineTextStyle}>
          Showing offline data. Pull to refresh when online.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  offlineText: {
    textAlign: 'center',
    marginTop: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}); 