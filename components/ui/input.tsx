
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  editable?: boolean;
  style?: object;
};

export function Input({ value, onChangeText, placeholder, secureTextEntry, editable = true, style }: InputProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      editable={editable}
      style={[styles.input, style]}
      placeholderTextColor="#94a3b8"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#222',
  },
});
