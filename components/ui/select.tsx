"use client";

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

  options,
  selected,
  onSelect,
  style
}: {
  options: { label: string; value: string }[];
  selected: string;
  onSelect: (value: string) => void;
  style?: object;
}) {
  return (
    <View style={style}>
      <Picker
        selectedValue={selected}
        onValueChange={onSelect}
        style={styles.picker}
      >
        {options.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    height: 48,
    width: '100%',
  },
});
