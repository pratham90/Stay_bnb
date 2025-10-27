
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type AlertProps = {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  style?: object;
};

export function Alert({ title, description, variant = 'default', style }: AlertProps) {
  return (
    <View style={[styles.alert, variant === 'destructive' ? styles.destructive : styles.default, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  default: {
    backgroundColor: '#fff',
  },
  destructive: {
    backgroundColor: '#fee2e2',
    borderColor: '#ef4444',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#222',
  },
  description: {
    fontSize: 14,
    color: '#64748b',
  },
});

