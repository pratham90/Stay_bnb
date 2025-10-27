
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  style?: object;
  children?: React.ReactNode;
};

const variantStyles = {
  default: {
    backgroundColor: '#2dd4bf',
    borderColor: '#2dd4bf',
    borderWidth: 1,
  },
  destructive: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
    borderWidth: 1,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: '#64748b',
    borderWidth: 1,
  },
  secondary: {
    backgroundColor: '#64748b',
    borderColor: '#64748b',
    borderWidth: 1,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
  },
  link: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
  },
};

const sizeStyles = {
  default: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  sm: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 6 },
  lg: { paddingVertical: 16, paddingHorizontal: 28, borderRadius: 10 },
  icon: { padding: 12, borderRadius: 24 },
};

export function Button({
  title,
  onPress,
  disabled,
  loading,
  variant = 'default',
  size = 'default',
  style,
  children,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        variantStyles[variant],
        sizeStyles[size],
        disabled ? styles.disabled : null,
        style,
      ]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        children ? children : <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.5,
  },
});
