
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  style?: object;
};

export function Checkbox({ checked, onChange, disabled, style }: CheckboxProps) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onChange(!checked)}
      activeOpacity={0.7}
      disabled={disabled}
      style={[styles.box, checked ? styles.checked : styles.unchecked, disabled && styles.disabled, style]}
    >
      {checked && <View style={styles.inner} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#2dd4bf',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#2dd4bf',
    borderColor: '#2dd4bf',
  },
  unchecked: {
    backgroundColor: '#fff',
    borderColor: '#e5e7eb',
  },
  inner: {
    width: 12,
    height: 12,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  disabled: {
    opacity: 0.5,
  },
});
