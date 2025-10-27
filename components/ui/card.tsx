import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type CardProps = {
  children: React.ReactNode;
  style?: object;
};

export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

type CardHeaderProps = {
  children: React.ReactNode;
  style?: object;
};

export function CardHeader({ children, style }: CardHeaderProps) {
  return <View style={[styles.header, style]}>{children}</View>;
}

type CardTitleProps = {
  children: React.ReactNode;
  style?: object;
};

export function CardTitle({ children, style }: CardTitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

type CardDescriptionProps = {
  children: React.ReactNode;
  style?: object;
};

export function CardDescription({ children, style }: CardDescriptionProps) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

type CardActionProps = {
  children: React.ReactNode;
  style?: object;
};

export function CardAction({ children, style }: CardActionProps) {
  return <View style={[styles.action, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginVertical: 8,
    flexDirection: 'column',
    gap: 12,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    color: '#64748b',
    fontSize: 14,
    marginBottom: 4,
  },

  action: {
    alignSelf: 'flex-end',
  },
});


// Only export React Native components
