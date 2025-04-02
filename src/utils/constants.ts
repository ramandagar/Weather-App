export const CACHE_EXPIRY = 30 * 60 * 1000;
export const CACHE_KEY = '@weather_cache';
export const DEBOUNCE_DELAY = 500;

export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°C`;
};

export const formatWindSpeed = (speed: number): string => {
  return `${speed} km/h`;
};

export const formatHumidity = (humidity: number): string => {
  return `${humidity}%`;
};

export const isCacheExpired = (timestamp: number): boolean => {
  return Date.now() - timestamp > CACHE_EXPIRY;
}; 