export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  conditions: string;
  city: string;
  timestamp: number;
}

export interface WeatherError {
  message: string;
  code: string;
}

export interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: WeatherError | null;
  isOffline: boolean;
} 