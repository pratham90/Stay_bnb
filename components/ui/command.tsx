
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type CommandItem = {
  label: string;
  onPress: () => void;
};

type CommandPaletteProps = {
  visible: boolean;
  onClose: () => void;
  items: CommandItem[];
  title?: string;
  placeholder?: string;
};

export function CommandPalette({ visible, onClose, items, title = 'Command Palette', placeholder = 'Search...', }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const filtered = items.filter(item => item.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          <FlatList
            data={filtered}
            keyExtractor={item => item.label}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => { item.onPress(); onClose(); }}>
                <Text style={styles.itemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.empty}>No commands found</Text>}
            style={{ maxHeight: 200 }}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    minWidth: 280,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
  },
  itemText: {
    fontSize: 16,
    color: '#222',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 16,
  },
  closeButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#2dd4bf',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
