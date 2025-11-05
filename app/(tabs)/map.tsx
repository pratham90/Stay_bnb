import React, { useRef, useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, Animated, Easing, TextInput, View, Platform, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Filter, List, Plus, Navigation } from 'lucide-react-native';
import { WebView } from 'react-native-webview';

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
  // State for location, markers, nearby type, loading, and result
  const [location, setLocation] = useState('New York');
  const [nearbyType, setNearbyType] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

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

  // API call to backend
  const handleSearch = async () => {
    setLoading(true);
    setResult(null);
    try {
      const params = new URLSearchParams();
      params.append('location', location);
      if (nearbyType) params.append('show_nearby', nearbyType);
      const res = await fetch(`http://192.168.100.2:8000/api/map?${params.toString()}`);
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ error: 'Failed to fetch map data' });
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar with Avatar, Search, Filter */}
      <Animated.View style={[styles.topBar, { transform: [{ translateY: topBarAnim }] }]}> 
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
        <Animated.View style={[styles.searchBar, { opacity: searchAnim, transform: [{ scale: searchAnim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }] }]}> 
          <MapPin size={20} color="#bbb" />
          <TextInput
            style={styles.searchInput}
            placeholder="Where to?"
            placeholderTextColor="#bbb"
            value={location}
            onChangeText={setLocation}
          />
        </Animated.View>
      
      </Animated.View>
      {/* Nearby places dropdown and search button in a row below search bar */}
      <View style={{ flexDirection: 'row', marginHorizontal: 16, marginTop: 10, marginBottom: 8, alignItems: 'center' }}>
        <View style={{ flex: 1, backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#eee', marginRight: 10 }}>
          <Picker
            selectedValue={nearbyType}
            onValueChange={setNearbyType}
            style={{ height: 64 }}
            itemStyle={{ fontSize: 16 }}
          >
            <Picker.Item label="No nearby places" value="" />
            <Picker.Item label="Tourist Attractions" value="tourism" />
            <Picker.Item label="Restaurants" value="restaurant" />
            <Picker.Item label="Hotels" value="hotel" />
            <Picker.Item label="Cafes" value="cafe" />
          </Picker>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: '#14b8a6', borderRadius: 18, paddingVertical: 12, paddingHorizontal: 22, alignItems: 'center', justifyContent: 'center', minWidth: 120 }}
          onPress={handleSearch}
          disabled={loading}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{loading ? 'Loading...' : 'Show on Map'}</Text>
        </TouchableOpacity>
      </View>
      {/* Animated Map Area with Gradient (hide demo markers if result shown) */}
      <Animated.View style={[styles.mapArea, { opacity: mapAnim }]}> 
        <LinearGradient
          colors={["#e0f7fa", "#e0e7ef", "#f8fafc"]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.mapGradient}
        />
        {/* Show demo price markers only if no result */}
      
        {/* If result, show map HTML or error */}
        {loading && (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#14b8a6" />
            <Text style={{ marginTop: 8, color: '#14b8a6' }}>Loading map...</Text>
          </View>
        )}
        {result && result.success && result.map_html && (
          <WebView
            originWhitelist={["*"]}
            source={{ html: result.map_html }}
            style={{ flex: 1, minHeight: 500, borderRadius: 12, margin: 0 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scalesPageToFit={true}
            automaticallyAdjustContentInsets={false}
          />
        )}
        {result && (!result.success || !result.map_html) && (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 12 }}>
            <Text style={{ color: 'red', fontWeight: 'bold' }}>{result.error || 'Error loading map'}</Text>
          </View>
        )}
      </Animated.View>
      {/* Removed List, Plus, Send, and Location icons from the bottom for a cleaner UI */}
    </SafeAreaView>
  );
}
