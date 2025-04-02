import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { lightTheme, darkTheme } from '../theme/theme';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  loading?: boolean;
  style?: ViewStyle;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Enter city name...',
  loading = false,
  style,
}) => {
  const { dark } = useTheme();
  const theme = dark ? darkTheme : lightTheme;

  const inputStyle = [
    styles.input,
    {
      backgroundColor: theme.colors.searchBackground,
      color: theme.colors.text,
    },
  ];

  const clearTextStyle = [
    styles.clearText,
    { color: theme.colors.secondaryText },
  ];

  return (
    <View style={[styles.container, style]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.secondaryText}
        style={inputStyle}
      />
      {value.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={onClear}
        >
          <Text style={clearTextStyle}>✕</Text>
        </TouchableOpacity>
      )}
      {loading && (
        <ActivityIndicator
          style={styles.loader}
          color={theme.colors.primary}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  clearButton: {
    position: 'absolute',
    right: 40,
    padding: 8,
  },
  clearText: {
    fontSize: 16,
  },
  loader: {
    position: 'absolute',
    right: 32,
  },
}); 