
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type TextareaProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
  style?: object;
};

export function Textarea({ value, onChangeText, placeholder, editable = true, style }: TextareaProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      editable={editable}
      style={[styles.textarea, style]}
      multiline
      numberOfLines={4}
      placeholderTextColor="#94a3b8"
    />
  );
}

const styles = StyleSheet.create({
  textarea: {
    minHeight: 64,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#222',
    textAlignVertical: 'top',
  },
});
