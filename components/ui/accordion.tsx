
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type AccordionItemType = {
  title: string;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItemType[];
  style?: object;
};

export function Accordion({ items, style }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <View style={[styles.container, style]}>
      {items.map((item, idx) => (
        <View key={idx} style={styles.item}>
          <TouchableOpacity
            style={styles.trigger}
            onPress={() => setOpenIndex(openIndex === idx ? null : idx)}
            activeOpacity={0.7}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.chevron}>{openIndex === idx ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {openIndex === idx && (
            <View style={styles.content}>
              {item.content}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
  chevron: {
    fontSize: 16,
    color: '#64748b',
    marginLeft: 8,
  },
  content: {
    padding: 12,
    backgroundColor: '#f9fafb',
  },
});


