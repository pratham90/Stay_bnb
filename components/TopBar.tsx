import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TopBar() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.topBar, { paddingTop: insets.top || 12 }]}> 
      <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.avatar} />
      <Text style={styles.logo}>nomadtable</Text>
      <View style={styles.topIcons}>
        <TouchableOpacity style={styles.iconBtn}><Text style={styles.icon}>🔔</Text></TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}><Text style={styles.icon}>❤️</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  logo: { fontWeight: 'bold', fontSize: 20, color: '#222' },
  topIcons: { flexDirection: 'row', gap: 12 },
  iconBtn: { marginLeft: 8 },
  icon: { fontSize: 22 },
});
