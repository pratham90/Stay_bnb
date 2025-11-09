
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Animated, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Heart, Star, MapPin, Calendar, LogOut ,SearchIcon} from 'lucide-react-native';
import { Badge } from '@/components/ui/badge';

const cities = [
  { name: 'New York', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
  { name: 'Miami', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { name: 'Chicago', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80' },
  { name: 'Malibu', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80' },
  { name: 'Aspen', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80' },
];



export default function ExploreTab() {
  const [selectedCity, setSelectedCity] = useState('New York');
  const [inputCity, setInputCity] = useState('New York');
  const [favorites, setFavorites] = useState(new Set());
  const [placeType, setPlaceType] = useState<'hotel' | 'restaurant' | 'tourism'>('hotel');
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const cityAnim = useRef(cities.map(() => new Animated.Value(0))).current;
  const cardAnim = useRef(Array(10).fill(0).map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(80, cityAnim.map(anim =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      })
    )).start();
    Animated.stagger(120, cardAnim.map(anim =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      })
    )).start();
  }, [cityAnim, cardAnim]);

  // Fetch places from backend only when user clicks OK
  // Map frontend placeType to backend endpoint
  const getEndpoint = (type: typeof placeType) => {
    if (type === 'hotel') return 'hotels';
    if (type === 'restaurant') return 'restaurants';
    if (type === 'tourism') return 'tourism';
    return '';
  };

  const fetchPlaces = async (locationToSearch?: string, typeToSearch?: typeof placeType) => {
    const loc = (locationToSearch !== undefined ? locationToSearch : inputCity).trim();
    const type = typeToSearch || placeType;
    if (!loc || loc.length < 3) return;
    setLoading(true);
    setPlaces([]);
    const endpoint = getEndpoint(type);
    try {
      const res = await fetch(`http://192.168.100.5:8000/api/${endpoint}?location=${encodeURIComponent(loc)}&limit=10`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setPlaces(data.data);
      } else {
        setPlaces([]);
      }
    } catch {
      setPlaces([]);
    }
    setLoading(false);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Search Bar */}
      <Animated.View style={styles.searchBarWrap}>
        <View style={styles.searchBarRow}>
          <IconSymbol name="explore.fill" size={22} color="#14b8a6" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter location (e.g. New York)"
            placeholderTextColor="#bbb"
            value={inputCity}
            onChangeText={setInputCity}
          />
          <TouchableOpacity
            style={{ marginLeft: 8, backgroundColor: '#14b8a6', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 8 }}
            onPress={() => {
              if (inputCity && inputCity.trim().length >= 3) {
                setSelectedCity(inputCity.trim());
                fetchPlaces(inputCity.trim(), placeType);
              }
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              <SearchIcon size={20} color="#fff" />
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Place type selector */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10, gap: 8 }}>
        <TouchableOpacity onPress={() => { setPlaceType('hotel'); fetchPlaces(inputCity.trim(), 'hotel'); }} style={{ backgroundColor: placeType === 'hotel' ? '#2dd4bf' : '#f3f4f6', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 8 }}>
          <Text style={{ color: placeType === 'hotel' ? '#fff' : '#222', fontWeight: 'bold' }}>Hotels</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setPlaceType('restaurant'); fetchPlaces(inputCity.trim(), 'restaurant'); }} style={{ backgroundColor: placeType === 'restaurant' ? '#2dd4bf' : '#f3f4f6', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 8 }}>
          <Text style={{ color: placeType === 'restaurant' ? '#fff' : '#222', fontWeight: 'bold' }}>Restaurants</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setPlaceType('tourism'); fetchPlaces(inputCity.trim(), 'tourism'); }} style={{ backgroundColor: placeType === 'tourism' ? '#2dd4bf' : '#f3f4f6', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 8 }}>
          <Text style={{ color: placeType === 'tourism' ? '#fff' : '#222', fontWeight: 'bold' }}>Tourist Attractions</Text>
        </TouchableOpacity>
      </View>

      {/* Real places list from backend */}
      {loading ? (
        <Text style={{ textAlign: 'center', color: '#14b8a6', marginTop: 32 }}>Loading...</Text>
      ) : (
        <ScrollView style={styles.listingsScroll}>
          {places.length === 0 && (
            <Text style={{ textAlign: 'center', color: '#888', marginTop: 32 }}>No results found.</Text>
          )}
          {places.map((item, idx) => (
            <Animated.View
              key={item._id || item.id || item.name + idx}
              style={{
                opacity: cardAnim[idx % cardAnim.length],
                transform: [{ translateY: cardAnim[idx % cardAnim.length].interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
              }}
            >
              <TouchableOpacity style={styles.listingCard}>
                <View style={styles.listingImageContainer}>
                  <Image source={{ uri: item.image || 'https://placehold.co/400x200?text=No+Image' }} style={styles.listingImage} />
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => {
                      const id = item._id || item.id || idx;
                      setFavorites(prev => {
                        const newFavorites = new Set(prev);
                        if (newFavorites.has(id)) newFavorites.delete(id); else newFavorites.add(id);
                        return newFavorites;
                      });
                    }}
                  >
                    <Heart size={20} color={favorites.has(item._id || item.id || idx) ? '#ef4444' : '#888'} />
                  </TouchableOpacity>
                  <View style={styles.badgeContainer}>
                    <Badge label={item.type || placeType} variant="default" />
                  </View>
                </View>
                <View style={styles.listingInfo}>
                  <View style={styles.listingTitleRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.listingTitle}>{item.name || item.title || item.display_name}</Text>
                      <View style={styles.listingLocationRow}>
                        <MapPin size={14} color="#888" />
                        <Text style={styles.listingLocation}>{item.address || item.location || selectedCity}</Text>
                      </View>
                    </View>
                    {item.rating && (
                      <View style={styles.listingRatingRow}>
                        <Star size={16} color="#facc15" />
                        <Text style={styles.listingRating}>{item.rating}</Text>
                      </View>
                    )}
                  </View>
                  {item.distance && <Text style={styles.listingDistance}>{item.distance}</Text>}
                  {item.price && (
                    <Text style={styles.listingPrice}>
                      ${item.price}
                      <Text style={styles.listingPriceNight}> / night</Text>
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 8,
  },
  searchBarWrap: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
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
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  categoryLabel: {
    fontSize: 13,
    color: '#222',
    marginTop: 2,
    fontWeight: '500',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 12,
    marginBottom: 6,
    marginLeft: 16,
  },
  horizontalScroll: {
    paddingLeft: 12,
    marginBottom: 8,
  },
  popularCard: {
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 18,
    marginRight: 14,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  popularImage: {
    width: '100%',
    height: 100,
    borderRadius: 14,
    marginBottom: 8,
  },
  popularTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  popularLocation: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  citiesScroll: {
    paddingVertical: 16,
    paddingLeft: 12,
    marginBottom: 8,
  },
  cityChip: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cityChipSelected: {
    backgroundColor: '#14b8a6',
  },
  cityImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginBottom: 4,
  },
  cityText: {
    fontSize: 15,
    color: '#222',
    fontWeight: '600',
  },
  cityTextSelected: {
    color: '#fff',
  },
  listingsScroll: {
    paddingHorizontal: 12,
  },
  listingCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  listingImageContainer: {
    position: 'relative',
  },
  listingImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  badgeContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  listingInfo: {
    padding: 14,
  },
  listingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  listingTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
  },
  listingLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  listingLocation: {
    fontSize: 13,
    color: '#888',
    marginLeft: 2,
  },
  listingRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginLeft: 8,
  },
  listingRating: {
    fontSize: 14,
    color: '#222',
    fontWeight: '600',
    marginLeft: 2,
  },
  listingDistance: {
    fontSize: 13,
    color: '#14b8a6',
    marginBottom: 2,
  },
  listingPrice: {
    fontSize: 16,
    color: '#222',
    fontWeight: '700',
    marginTop: 2,
  },
  listingPriceNight: {
    fontSize: 13,
    color: '#888',
    fontWeight: '400',
  },
});
