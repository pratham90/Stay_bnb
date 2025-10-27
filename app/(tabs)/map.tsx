import React from 'react';
import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, Animated } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function Map() {
  // Example price pins data
  const pins = [
    { price: '$120', x: 80, y: 180 },
    { price: '$78', x: 220, y: 120 },
    { price: '$156', x: 200, y: 220 },
    { price: '$95', x: 140, y: 260 },
    { price: '$89', x: 180, y: 320 },
  ];

  // Animation for pins
  const [fadeAnim] = React.useState(pins.map(() => new Animated.Value(0)));

  React.useEffect(() => {
    Animated.stagger(120, fadeAnim.map(anim =>
      Animated.spring(anim, {
        toValue: 1,
        useNativeDriver: true,
      })
    )).start();
  }, [fadeAnim]);

  return (
    <ThemedView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        {/* Avatar */}
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.avatar} />
        {/* Search bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchText}>Where to?</Text>
        </View>
        {/* Filter icon */}
        <View style={styles.filterIcon}>
          {/* Use your Icon component if available */}
          <Text style={{ fontSize: 22 }}>⚲</Text>
        </View>
      </View>

      {/* Travelers Here badge */}
      <View style={styles.travelersBadge}>
        {/* Use Badge from UI if available */}
        <View style={styles.badge}><Text style={styles.badgeText}>Travelers Here</Text></View>
      </View>

      {/* Map background (placeholder) */}
      <View style={styles.mapBg}>
        {/* Animated pins */}
        {pins.map((pin, idx) => (
          <Animated.View
            key={idx}
            style={[styles.pin, {
              left: pin.x,
              top: pin.y,
              opacity: fadeAnim[idx],
              transform: [{ scale: fadeAnim[idx].interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] }) }],
            }]}
          >
            <View style={styles.pinCircle}>
              <Text style={styles.pinText}>{pin.price}</Text>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Floating buttons */}
      <View style={styles.fabContainer}>
        <View style={styles.listBtn}><Text style={styles.listBtnText}>List</Text></View>
        <View style={styles.addBtn}><Text style={styles.addBtnText}>+</Text></View>
      </View>

      {/* Location button */}
      <View style={styles.locationBtn}>
        <Text style={{ fontSize: 22 }}>➤</Text>
      </View>

      {/* Bottom navigation is handled by tabs layout */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginHorizontal: 16,
    gap: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    color: '#888',
    fontSize: 16,
  },
  filterIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  travelersBadge: {
    marginTop: 12,
    marginLeft: 24,
    alignSelf: 'flex-start',
  },
  badge: {
    backgroundColor: '#2dd4bf',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  mapBg: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 8,
    borderRadius: 24,
    backgroundColor: '#f0f9ff',
    overflow: 'hidden',
  },
  pin: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinCircle: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#222',
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  pinText: {
    fontWeight: 'bold',
    color: '#222',
    fontSize: 16,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  listBtn: {
    backgroundColor: '#222',
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginRight: 8,
  },
  listBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addBtn: {
    backgroundColor: '#2dd4bf',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginLeft: 8,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  locationBtn: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#fff',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});
