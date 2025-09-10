import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  style,
  textStyle,
  disabled = false
}: ButtonProps) {
  const { colors } = useTheme();
  
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: colors.primary };
      case 'secondary':
        return { backgroundColor: colors.textSecondary };
      case 'outline':
        return { 
          backgroundColor: 'transparent', 
          borderWidth: 2, 
          borderColor: colors.primary 
        };
      default:
        return { backgroundColor: colors.primary };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'outline':
        return colors.primary;
      default:
        return colors.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        styles[size],
        disabled && styles.disabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.text, 
        { color: getTextColor() }, 
        textStyle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
});