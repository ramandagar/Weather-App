import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { WeatherData } from '../models/weather';
import { formatHumidity, formatTemperature, formatWindSpeed } from '../utils/constants';
import { lightTheme, darkTheme } from '../theme/theme';

interface WeatherCardProps {
  data: WeatherData;
  onRefresh: () => void;
  refreshing: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  data,
  onRefresh,
  refreshing,
}) => {
  const { dark } = useTheme();
  const theme = dark ? darkTheme : lightTheme;

  const cardStyle = {
    ...styles.card,
    backgroundColor: theme.colors.weatherCard,
    shadowColor: theme.colors.shadow,
  };

  const headerStyle = {
    ...styles.cityName,
    color: theme.colors.text,
  };

  const tempStyle = {
    ...styles.temperature,
    color: theme.colors.text,
  };

  const detailLabelStyle = {
    ...styles.detailLabel,
    color: theme.colors.secondaryText,
  };

  const detailValueStyle = {
    ...styles.detailValue,
    color: theme.colors.text,
  };

  const conditionsStyle = {
    ...styles.conditions,
    color: theme.colors.text,
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={cardStyle}>
        <Text style={headerStyle}>{data.city}</Text>
        <Text style={tempStyle}>{formatTemperature(data.temperature)}</Text>
        <Text style={conditionsStyle}>{data.conditions}</Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={detailLabelStyle}>Humidity</Text>
            <Text style={detailValueStyle}>{formatHumidity(data.humidity)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={detailLabelStyle}>Wind</Text>
            <Text style={detailValueStyle}>{formatWindSpeed(data.windSpeed)}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  conditions: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    textTransform: 'capitalize',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 