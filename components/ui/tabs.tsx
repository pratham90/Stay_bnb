"use client";


import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Tab = {
  label: string;
  value: string;
};

type TabsProps = {
  tabs: Tab[];
  selected: string;
  onSelect: (value: string) => void;
  style?: object;
};

export function Tabs({ tabs, selected, onSelect, style }: TabsProps) {
  return (
    <View style={[styles.tabList, style]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.value}
          style={[styles.tab, selected === tab.value && styles.tabSelected]}
          onPress={() => onSelect(tab.value)}
        >
          <Text style={selected === tab.value ? styles.tabLabelSelected : styles.tabLabel}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabList: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  tabSelected: {
    borderColor: '#007AFF',
  },
  tabLabel: {
    color: '#333',
  },
  tabLabelSelected: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
