import { useState, useCallback, useEffect } from 'react';
import { WeatherService } from '../services/weatherService';
import { WeatherData, WeatherError, WeatherState } from '../models/weather';
import debounce from 'lodash/debounce';
import { DEBOUNCE_DELAY } from '../utils/constants';
import { MyToast } from '../utils/toast';

export const useWeatherViewModel = () => {
  const [state, setState] = useState<WeatherState>({
    data: null,
    loading: false,
    error: null,
    isOffline: false,
  });

  // Load cached data on initial render
  useEffect(() => {
    const loadCachedData = async () => {
      try {
        const cachedData = await WeatherService.getCachedWeather();
        if (cachedData) {
          setState({
            data: cachedData,
            loading: false,
            error: null,
            isOffline: true,
          });
        }
      } catch (error) {
        // Silently fail loading cache
      }
    };

    loadCachedData();
  }, []);

  const fetchWeather = useCallback(
    debounce(async (city: string) => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        // Try to fetch new data
        const weatherData = await WeatherService.fetchWeather(city);
        
        setState({
          data: weatherData,
          loading: false,
          error: null,
          isOffline: false,
        });
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 
                        typeof error === 'object' && error !== null && 'message' in error 
                          ? String(error.message) 
                          : 'An unknown error occurred';
        
        MyToast(errorMsg);
        // If fetch fails, try to get cached data
        const cachedData = await WeatherService.getCachedWeather();
        
        if (cachedData) {
          setState({
            data: cachedData,
            loading: false,
            error: null,
            isOffline: true,
          });
        } else {
          setState({
            data: null,
            loading: false,
            error: error as WeatherError,
            isOffline: false,
          });
        }
      }
    }, DEBOUNCE_DELAY),
    []
  );

  const refreshWeather = useCallback(async () => {
    if (state.data?.city) {
      await fetchWeather(state.data.city);
    }
  }, [state.data?.city, fetchWeather]);

  return {
    state,
    fetchWeather,
    refreshWeather,
  };
}; 