
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type BadgeProps = {
  label: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  style?: object;
};

const variantStyles = {
  default: {
    backgroundColor: '#2dd4bf',
    borderColor: 'transparent',
    color: '#fff',
  },
  secondary: {
    backgroundColor: '#64748b',
    borderColor: 'transparent',
    color: '#fff',
  },
  destructive: {
    backgroundColor: '#ef4444',
    borderColor: 'transparent',
    color: '#fff',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: '#64748b',
    color: '#222',
    borderWidth: 1,
  },
};

export function Badge({ label, variant = 'default', style }: BadgeProps) {
  const vs = variantStyles[variant] || variantStyles.default;
  return (
    <View style={[styles.badge, vs, style]}>
      <Text style={[styles.text, { color: vs.color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 24,
    borderWidth: 0,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});
