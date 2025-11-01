import React, { useRef, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, Animated, Easing, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Filter, List, Plus, Navigation } from 'lucide-react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 6,
    zIndex: 2,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: 8,
  },
  filterBtn: {
    marginLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  travelersBadge: {
    alignSelf: 'flex-start',
    marginLeft: 62,
    marginTop: 6,
    backgroundColor: '#14b8a6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  travelersText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  mapArea: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 0,
    borderRadius: 0,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  mapGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  priceMarker: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#222',
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  fabRow: {
    position: 'absolute',
    bottom: 38,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  listBtn: {
    backgroundColor: '#111827',
    borderRadius: 18,
    paddingHorizontal: 22,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  listBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  plusBtn: {
    backgroundColor: '#14b8a6',
    borderRadius: 18,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  locationBtn: {
    position: 'absolute',
    bottom: 38,
    right: 24,
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 3,
  },
});

export default function MapTab() {
  //
  // Animation refs
  const topBarAnim = useRef(new Animated.Value(-60)).current;
  const searchAnim = useRef(new Animated.Value(0)).current;
  const badgeAnim = useRef(new Animated.Value(0)).current;
  const mapAnim = useRef(new Animated.Value(0)).current;
  const markerAnim0 = useRef(new Animated.Value(0));
  const markerAnim1 = useRef(new Animated.Value(0));
  const markerAnim2 = useRef(new Animated.Value(0));
  const markerAnim3 = useRef(new Animated.Value(0));
  const markerAnim4 = useRef(new Animated.Value(0));
  const markerAnims = [
    markerAnim0.current,
    markerAnim1.current,
    markerAnim2.current,
    markerAnim3.current,
    markerAnim4.current,
  ];
  const fabAnim = useRef(new Animated.Value(0)).current;
  const locationAnim = useRef(new Animated.Value(0)).current;

  // Example price marker positions (percentages of width/height)
  const priceMarkers = [
    { price: '$120', top: `32%`, left: `55%` },
    { price: '$78', top: `18%`, left: `70%` },
    { price: '$156', top: `28%`, left: `75%` },
    { price: '$95', top: `54%`, left: `44%` },
    { price: '$89', top: `60%`, left: `55%` },
  ];

  useEffect(() => {
    Animated.sequence([
      Animated.timing(topBarAnim, { toValue: 0, duration: 400, easing: Easing.out(Easing.exp), useNativeDriver: true }),
      Animated.timing(searchAnim, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.timing(badgeAnim, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.timing(mapAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.stagger(100, markerAnims.map((a) => Animated.timing(a, { toValue: 1, duration: 350, useNativeDriver: true }))),
      Animated.parallel([
        Animated.timing(fabAnim, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.timing(locationAnim, { toValue: 1, duration: 350, useNativeDriver: true }),
      ]),
    ]).start();
  }, [topBarAnim, searchAnim, badgeAnim, mapAnim, markerAnims, fabAnim, locationAnim]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar with Avatar, Search, Filter */}
      <Animated.View style={[styles.topBar, { transform: [{ translateY: topBarAnim }] }]}> 
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
        <Animated.View style={[styles.searchBar, { opacity: searchAnim, transform: [{ scale: searchAnim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }] }]}> 
          <MapPin size={20} color="#bbb" />
          <TextInput style={styles.searchInput} placeholder="Where to?" placeholderTextColor="#bbb" />
        </Animated.View>
        <TouchableOpacity style={styles.filterBtn}>
          <Filter size={20} color="#bbb" />
        </TouchableOpacity>
      </Animated.View>
      {/* Travelers Here Badge */}
      <Animated.View style={[styles.travelersBadge, { opacity: badgeAnim, transform: [{ translateY: badgeAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }] }]}> 
        <Text style={styles.travelersText}>• Travelers Here</Text>
      </Animated.View>
      {/* Animated Map Area with Gradient */}
      <Animated.View style={[styles.mapArea, { opacity: mapAnim }]}> 
        <LinearGradient
          colors={["#e0f7fa", "#e0e7ef", "#f8fafc"]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.mapGradient}
        />
        {/* Animated Price Markers */}
        {priceMarkers.map((marker, idx) => (
          <Animated.View
            key={marker.price}
            style={[styles.priceMarker, {
              top: `${marker.top}%` as `${number}%`,
              left: `${marker.left}%` as `${number}%`,
              opacity: markerAnims[idx],
              transform: [{ scale: markerAnims[idx].interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) }],
            }]}
          >
            <Text style={{ fontWeight: 'bold', color: '#222', fontSize: 16 }}>{marker.price}</Text>
          </Animated.View>
        ))}
      </Animated.View>
      {/* Floating Action Buttons Row */}
      <Animated.View style={[styles.fabRow, { opacity: fabAnim, transform: [{ translateY: fabAnim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }] }]}> 
        <TouchableOpacity style={styles.listBtn}>
          <List size={20} color="#fff" />
          <Text style={styles.listBtnText}>List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.plusBtn}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
      {/* Floating Location Button */}
      <Animated.View style={[styles.locationBtn, { opacity: locationAnim, transform: [{ scale: locationAnim.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) }] }]}> 
        <TouchableOpacity>
          <Navigation size={24} color="#14b8a6" />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}
