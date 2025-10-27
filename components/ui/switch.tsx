
import React from 'react';
import { Switch as RNSwitch } from 'react-native';

type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
};

export function Switch({ value, onValueChange, disabled }: SwitchProps) {
  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{ false: '#e5e7eb', true: '#2dd4bf' }}
      thumbColor={value ? '#fff' : '#64748b'}
    />
  );
}
