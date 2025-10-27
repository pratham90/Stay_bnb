
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type BreadcrumbItemType = {
  label: string;
  onPress?: () => void;
  isCurrent?: boolean;
};

type BreadcrumbProps = {
  items: BreadcrumbItemType[];
  style?: object;
};

export function Breadcrumb({ items, style }: BreadcrumbProps) {
  return (
    <View style={[styles.container, style]}>
      {items.map((item, idx) => (
        <View key={idx} style={styles.item}>
          {item.onPress ? (
            <TouchableOpacity onPress={item.onPress}>
              <Text style={[styles.link, item.isCurrent && styles.current]}>{item.label}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={[styles.link, item.isCurrent && styles.current]}>{item.label}</Text>
          )}
          {idx < items.length - 1 && <Text style={styles.separator}>›</Text>}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    fontSize: 14,
    color: '#64748b',
    marginHorizontal: 2,
  },
  current: {
    color: '#222',
    fontWeight: 'bold',
  },
  separator: {
    fontSize: 14,
    color: '#94a3b8',
    marginHorizontal: 2,
  },
});

