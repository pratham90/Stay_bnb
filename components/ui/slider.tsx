
import React from 'react';
import { Slider as RNESlider } from '@react-native-community/slider';

type SliderProps = {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  disabled?: boolean;
  style?: object;
};

export function Slider({ value, onValueChange, minimumValue = 0, maximumValue = 100, step = 1, disabled, style }: SliderProps) {
  return (
    <RNESlider
      value={value}
      onValueChange={onValueChange}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      step={step}
      disabled={disabled}
      style={style}
      minimumTrackTintColor="#2dd4bf"
      maximumTrackTintColor="#e5e7eb"
      thumbTintColor="#2dd4bf"
    />
  );
}

