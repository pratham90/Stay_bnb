
import React, { useRef, useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Animated, TextInput, View, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Search } from 'lucide-react-native';
import { WebView } from 'react-native-webview';
import { PlacesProvider, usePlaces } from '../../context/PlacesContext';
import { useUser } from '../../context/UserContext';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  mapArea: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    borderRadius: 0,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    
  },
  floatingSearchBar: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '82%',
    maxWidth: 500,
    backgroundColor: '#ffffffff',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: '#bfbfbfff',
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: '#232946',
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: 8,
    paddingVertical: 4,
  },
  searchIconBtn: {
    marginLeft: 10,
    backgroundColor: '#47afe8ff',
    borderRadius: 16,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownLabelFloating: {
    position: 'absolute',
    top: 126,
    left: 24,
    zIndex: 21,
    backgroundColor: '#f4f6fb',
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderRadius: 18,
    fontSize: 15,
    color: '#4C6FFF',
    fontWeight: '700',
    shadowColor: '#4C6FFF',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e6ef',
    letterSpacing: 0.2,
    alignSelf: 'flex-start',
  },
  dropdownOverlay: {
    position: 'absolute',
    top: 80,
    left: 28,
    zIndex: 20,
    backgroundColor: '#fdfdfdff',
    borderRadius:10,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#dadadaff',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e0e6ef',
    padding: 0,
  },
});




function MapTabInner(props: any) {
  const { mapResult, loading, fetchMap } = usePlaces();
  const { user } = useUser();
  // Set a default location for initial map load
  const [location, setLocation] = useState('Rajwada, Indore');
  const [showResult, setShowResult] = useState(true);
  // Default to 'tourism' so tourist attractions are shown on first load
  const [nearbyType, setNearbyType] = useState('restaurant');
  const mapAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(mapAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, [mapAnim]);

  // Accept both singular and plural, always return backend value
  const getShowNearbyValue = (type: string) => {
    if (type === 'tourism' || type === 'Tourist Attractions') return 'tourism';
    if (type === 'restaurant' || type === 'restaurants' || type === 'Restaurants') return 'restaurant';
    if (type === 'hotel' || type === 'hotels' || type === 'Hotels') return 'hotel';
    if (type === 'cafe' || type === 'cafes' || type === 'Cafes') return 'cafe';
    return '';
  };

  // Fetch map on mount and whenever location or nearbyType changes
  useEffect(() => {
    const showNearby = getShowNearbyValue(nearbyType);
    // Pass user.clerk_id to fetchMap for user-specific data
    fetchMap(location, user?.clerk_id, showNearby);
    setShowResult(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, nearbyType, user?.clerk_id]);

  const handleSearch = async () => {
    const showNearby = getShowNearbyValue(nearbyType);
    setShowResult(true); // Always show map area, just show loading indicator
    await fetchMap(location, user?.clerk_id, showNearby);
  };

  return (
    <View style={styles.container}>
      {/* Floating Search Bar with Search Icon */}
      <View style={styles.floatingSearchBar}>
        <View style={styles.searchBar}>
          <MapPin size={20} color="#b0b6c8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Where to?"
            placeholderTextColor="#bbb"
            value={location}
            onChangeText={setLocation}
            returnKeyType="search"
          />
          <TouchableOpacity
            style={styles.searchIconBtn}
            onPress={handleSearch}
            activeOpacity={0.85}
          >
            <Search size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Pill-shaped dropdown for place selection */}
      <View style={styles.dropdownLabelFloating}>
        <Picker
          selectedValue={nearbyType}
          onValueChange={setNearbyType}
          style={{
            width: 160,
            color: '#4C6FFF',
            fontSize: 15,
            borderRadius: 18,
            backgroundColor: 'transparent',
            textAlign: 'center',
            alignSelf: 'center',
          }}
          itemStyle={{ fontSize: 15, textAlign: 'center' }}
        >
          <Picker.Item label="Nearby Place" value="" />
          <Picker.Item label="Tourist Attractions" value="tourism" />
          <Picker.Item label="Restaurants" value="restaurant" />
          <Picker.Item label="Hotels" value="hotel" />
          <Picker.Item label="Cafes" value="cafe" />
        </Picker>
      </View>

      {/* Fullscreen Map Area, only show after search */}
      {showResult && (
        <Animated.View style={[styles.mapArea, { opacity: mapAnim }]}> 
          <LinearGradient
            colors={["#232946", "#232946", "#232946"]}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
          {loading && (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size="large" color="#4C6FFF" />
              <Text style={{ marginTop: 8, color: '#4C6FFF' }}>Loading map...</Text>
            </View>
          )}
          {!loading && mapResult && mapResult.success && mapResult.map_html && (
            <WebView
              originWhitelist={["*"]}
              source={{ html: mapResult.map_html }}
              style={{ flex: 1, minHeight: 500, borderRadius: 0, margin: 0 }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              scalesPageToFit={true}
              automaticallyAdjustContentInsets={false}
            />
          )}
          {!loading && mapResult && (!mapResult.success || !mapResult.map_html) && (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 12 }}>
              <Text style={{ color: 'red', fontWeight: 'bold' }}>{mapResult.error || 'No results found for this search.'}</Text>
            </View>
          )}
          {!loading && !mapResult && (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 12 }}>
              <Text style={{ color: '#bbb', fontWeight: 'bold' }}>Search for a place to see the map.</Text>
            </View>
          )}
        </Animated.View>
      )}
    </View>
  );
}

export default function MapTab(props: any) {
  return (
    <PlacesProvider>
      <MapTabInner {...props} />
    </PlacesProvider>
  );
}
