import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherData, WeatherError } from '../models/weather';
import { CACHE_KEY, CACHE_EXPIRY, isCacheExpired } from '../utils/constants';

// Hardcoded API key for demo - in production, use environment variables properly
const OPENWEATHER_API_KEY = 'd6deaabe906bab0037943a6a3cc8f6ea';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export class WeatherService {
  static async fetchWeather(city: string): Promise<WeatherData> {
    try {
      const geoUrl = `${GEO_URL}/direct?q=${encodeURIComponent(city)}&limit=1&appid=${OPENWEATHER_API_KEY}`;
      
      const geoResponse = await fetch(geoUrl);

      if (!geoResponse.ok) {
        throw new Error('Failed to fetch city coordinates');
      }

      const geoData = await geoResponse.json();
      
      if (!geoData.length) {
        throw new Error('City not found');
      }

      const { lat, lon, name } = geoData[0];
      const weatherUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
      const weatherResponse = await fetch(weatherUrl);

      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const weatherData = await weatherResponse.json();
      
      const result: WeatherData = {
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        conditions: weatherData.weather[0].description,
        city: name,
        timestamp: Date.now(),
      };
      await this.cacheWeatherData(result);

      return result;
    } catch (error) {
      throw {
        message: error instanceof Error ? error.message : 'An error occurred',
        code: 'FETCH_ERROR',
      } as WeatherError;
    }
  }

  static async getCachedWeather(): Promise<WeatherData | null> {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);
      
      if (!cachedData) {
        return null;
      }

      const { data, timestamp } = JSON.parse(cachedData);
      
      // Check if cache is expired
      if (isCacheExpired(timestamp)) {
        await AsyncStorage.removeItem(CACHE_KEY);
        return null;
      }

      return data;
    } catch (error) {
      return null;
    }
  }

  private static async cacheWeatherData(data: WeatherData): Promise<void> {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      // Silently fail caching
    }
  }
} 