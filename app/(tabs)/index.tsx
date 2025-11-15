import React, { useState, useRef, useEffect } from 'react';
import api from '../../utils/api';
import { useUser } from '@/context/UserContext';
import { PlacesProvider } from '@/context/PlacesContext';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Animated, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Heart, Star, MapPin, SearchIcon } from 'lucide-react-native';
import { Badge } from '@/components/ui/badge';

const styles = StyleSheet.create({
    categoryChipsRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 15,
      
      gap: 16,
    },
    categoryChip: {
      paddingHorizontal: 26,
      paddingVertical: 12,
      borderRadius: 20,
      marginHorizontal: 0,
      marginRight: 0,
      marginLeft: 0,
      shadowColor: '#4C6FFF',
      shadowOpacity: 0.10,
      shadowRadius: 10,
      elevation: 2,
      borderWidth: 1.5,
      borderColor: 'transparent',
      minWidth: 90,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 6,
      transitionDuration: '120ms',
      transitionProperty: 'transform',
    },
    categoryChipActive: {
      // Use a subtle indigo gradient for the active chip
      backgroundColor: undefined,
      borderWidth: 0,
      shadowOpacity: 0.18,
      shadowRadius: 16,
      elevation: 4,
     
    },
    categoryChipInactive: {
      backgroundColor: '#f6f8ff',
      borderWidth: 1.5,
      borderColor: '#e0e7ff',
      
    },
    categoryChipText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#4C6FFF',
      letterSpacing: 0.1,
      
    },
    categoryChipTextActive: {
      color: '#fff',
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0,

  },
  floatingSearchBar: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    height: 120,
  },
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 28,
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: '#1c2c2eff',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
    width: '90%',
    borderWidth: 0.5,
    borderColor: '#e5e7eb',
    marginBottom: 12,
    marginTop: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingLeft: 12,
  },
  listingsScroll: {
    width: '100%',
    paddingHorizontal: 0,
    marginTop: 160,
  },
  listingCard: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 22,
    marginBottom: 22,
    marginHorizontal: 0,
    shadowColor: '#4C6FFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 24,
    elevation: 8,
    overflow: 'visible',
    maxWidth: 390,
    width: '92%',
    alignSelf: 'center',
    paddingBottom: 2,
    marginTop: 20,
  },
  listingImageContainer: {
    position: 'relative',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    overflow: 'hidden',
    height: 148,
  },
  listingImage: {
    width: '100%',
    height: 148,
    resizeMode: 'cover',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  favoriteButton: {
    position: 'absolute',
    top: 18,
    right: 18,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#4C6FFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  badgeContainer: {
    position: 'absolute',
    top: 18,
    left: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backdropFilter: 'blur(8px)',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  listingInfo: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    marginTop: -6,
  },
  listingTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 4,
  },
  listingTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#222',
    letterSpacing: 0.3,
    marginBottom: 2,
    textAlign: 'left',
    maxWidth: '80%',
  },
  listingLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 4,
  },
  listingLocation: {
    fontSize: 15,
    color: '#7b8cff',
    marginLeft: 8,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  listingRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
    backgroundColor: '#e6eaff',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 0,
  },
  listingRating: {
    fontSize: 16,
    color: '#facc15',
    marginLeft: 6,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  listingDistance: {
    fontSize: 13,
    color: '#b0b6c8',
    marginTop: 2,
    marginBottom: 2,
    textAlign: 'left',
  },
  listingPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4C6FFF',
    marginTop: 10,
    marginBottom: 2,
    textAlign: 'left',
    letterSpacing: 0.2,
  },
  listingPriceNight: {
    fontSize: 13,
    color: '#b0b6c8',
    marginLeft: 2,
    textAlign: 'left',
  },
});

export function ExploreTab(props: any) {
  const [selectedType, setSelectedType] = useState<'hotel' | 'restaurant' | 'tourism'>('hotel');
  // Animated values for cards
  const hotelCardAnim = useRef([] as Animated.Value[]);
  const restaurantCardAnim = useRef([] as Animated.Value[]);
  const tourismCardAnim = useRef([] as Animated.Value[]);
  // State variables
  const [selectedCity, setSelectedCity] = useState('Indore');
  const [inputCity, setInputCity] = useState('Indore');
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const cityAnim = useRef([]).current;
  const cardAnim = useRef([]).current;
  const [hotels, setHotels] = useState<any[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [tourism, setTourism] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, fetchUserLikes } = useUser();

    // Reset animation arrays when data changes
    useEffect(() => {
      hotelCardAnim.current = hotels ? hotels.map(() => new Animated.Value(0.8)) : [];
    }, [hotels]);
    useEffect(() => {
      restaurantCardAnim.current = restaurants ? restaurants.map(() => new Animated.Value(0.8)) : [];
    }, [restaurants]);
    useEffect(() => {
      tourismCardAnim.current = tourism ? tourism.map(() => new Animated.Value(0.8)) : [];
    }, [tourism]);

    // Helper to animate cards in
    const animateCards = (arr: Animated.Value[]) => {
      if (!arr || arr.length === 0) return;
      Animated.stagger(80, arr.map(anim =>
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
          friction: 7,
          tension: 60,
        })
      )).start();
    };

    useEffect(() => {
      if (selectedType === 'hotel' && hotelCardAnim.current && hotelCardAnim.current.length)
        animateCards(hotelCardAnim.current);
      if (selectedType === 'restaurant' && restaurantCardAnim.current && restaurantCardAnim.current.length)
        animateCards(restaurantCardAnim.current);
      if (selectedType === 'tourism' && tourismCardAnim.current && tourismCardAnim.current.length)
        animateCards(tourismCardAnim.current);
    }, [selectedType, hotels, restaurants, tourism]);
  const PLACEHOLDER_IMAGE = 'https://placehold.co/400x300?text=No+Image';

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

  // Fetch all categories for default or selected city
  const fetchAllCategories = async (city: string) => {
    setLoading(true);
    setError('');
    try {
      const userIdParam = user?.clerk_id ? `&clerk_id=${encodeURIComponent(user.clerk_id)}` : '';
      const [hotelsRes, restaurantsRes, tourismRes] = await Promise.all([
        api.get(`/api/hotels?location=${encodeURIComponent(city)}&limit=10${userIdParam}`).then(r => r.data),
        api.get(`/api/restaurants?location=${encodeURIComponent(city)}&limit=10${userIdParam}`).then(r => r.data),
        api.get(`/api/tourism?location=${encodeURIComponent(city)}&limit=10${userIdParam}`).then(r => r.data),
      ]);
      setHotels(hotelsRes.data || hotelsRes);
      setRestaurants(restaurantsRes.data || restaurantsRes);
      setTourism(tourismRes.data || tourismRes);
    } catch {
      setError('Failed to fetch places.');
      setHotels([]);
      setRestaurants([]);
      setTourism([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategories(selectedCity);
  }, [selectedCity]);

  const handleSearch = () => {
    if (inputCity && inputCity.trim().length >= 3) {
      setSelectedCity(inputCity.trim());
    }
  };

  // Helper to get category for API
  const getCategory = (type: string) => {
    if (type === 'hotel') return 'hotels';
    if (type === 'restaurant') return 'restaurants';
    if (type === 'tourism') return 'tourism';
    return type;
  };

  // Like/unlike handler
  const toggleFavorite = async (item: any, type: 'hotel' | 'restaurant' | 'tourism', idx?: number) => {
    if (!user?.clerk_id) {
      return;
    }
    const category = getCategory(type);
    let itemId = '';
    if (type === 'restaurant') {
      itemId = String(item.restaurant_id || item._id);
    } else if (type === 'hotel') {
      itemId = String(item.hotel_id || item._id);
    } else if (type === 'tourism') {
      itemId = String(item.place_id || item._id);
    }
    if (!itemId || itemId === 'undefined' || itemId === 'null') {
      console.warn('Cannot like/unlike: item ID is undefined or not present in data');
      return;
    }
    const isFav = favorites[itemId];
    setFavorites(prev => ({ ...prev, [itemId]: !isFav }));
    try {
      if (!isFav) {
        const payload = {
          item_id: itemId,
          name: item.name || item.title || item.display_name || '',
          image_url: item.image_url || item.image || '',
          type: category,
        };
        console.log('Sending LIKE request:', `/api/users/${user.clerk_id}/likes/${category}`, payload);
        await api.post(`/api/users/${user.clerk_id}/likes/${category}`, payload);
      } else {
        console.log('Sending UNLIKE request:', `/api/users/${user.clerk_id}/likes/${category}/${itemId}`);
        await api.delete(`/api/users/${user.clerk_id}/likes/${category}/${itemId}`);
      }
      // Refresh likes in profile
      fetchUserLikes(user.clerk_id);
    } catch (e) {
      // Optionally handle error for production
      console.error('Error updating favorite:', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Floating Search Bar */}
      <View style={styles.floatingSearchBar}>
        <View style={styles.searchBarRow}>
          <IconSymbol name="search" size={22} color="#b0b6c8" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Where to?"
            placeholderTextColor="#b0b6c8"
            value={inputCity}
            onChangeText={setInputCity}
          />
          <TouchableOpacity
            style={{ marginLeft: 8, backgroundColor: '#67cee8ff', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 8 }}
            onPress={handleSearch}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              <SearchIcon size={20} color="#fff" />
            </Text>
          </TouchableOpacity>
        </View>
        {/* Enhanced Category Chips */}
        <View style={styles.categoryChipsRow}>
          {[
            { type: 'hotel', label: 'Hotels', icon: 'hotel', gradient: ['#4cbdffff', '#41a5f2ff'] },
            { type: 'restaurant', label: 'Restaurant', icon: 'utensils', gradient: ['#4cbdffff', '#41a5f2ff'] },
            { type: 'tourism', label: 'Tourism', icon: 'map-pin', gradient: ['#4cbdffff', '#41a5f2ff'] },
          ].map(({ type, label, icon, gradient }) => {
            const isActive = selectedType === type;
            return (
              <TouchableOpacity
                key={type}
                style={[
                  styles.categoryChip,
                  isActive ? styles.categoryChipActive : styles.categoryChipInactive,
                  { transform: [{ scale: isActive ? 1.08 : 1 }] },
                ]}
                onPress={() => setSelectedType(type as 'hotel' | 'restaurant' | 'tourism')}
                activeOpacity={0.85}
              >
                {isActive ? (
                  <LinearGradient
                    colors={gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      ...StyleSheet.flatten(styles.categoryChip),
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      borderRadius: 20,
                      zIndex: -1,
                    }}
                  />
                ) : null}
                <IconSymbol name={icon} size={18} color={isActive ? '#fff' : '#4cdeffff'} />
                <Text style={[
                  styles.categoryChipText,
                  isActive && styles.categoryChipTextActive,
                ]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <ScrollView style={styles.listingsScroll}>
        {loading && <Text style={{ textAlign: 'center', marginVertical: 16 }}>Loading...</Text>}
        {error ? <Text style={{ color: 'red', textAlign: 'center', marginVertical: 8 }}>{error}</Text> : null}

        {/* Only show selected type */}
        {selectedType === 'hotel' && (
          hotels && hotels.length > 0 ? hotels.map((item, idx) => {
            const anim = hotelCardAnim.current && hotelCardAnim.current[idx] ? hotelCardAnim.current[idx] : new Animated.Value(1);
            const itemId = item.hotel_id || item._id;
            return (
              <Animated.View
                key={itemId || idx}
                style={[styles.listingCard, { transform: [{ scale: anim }] }]}
              >
                <TouchableOpacity onPress={() => {}}>
                  <View style={styles.listingImageContainer}>
                    <Image source={{ uri: item.image_url || PLACEHOLDER_IMAGE }} style={styles.listingImage} />
                    {(item.hotel_id || item._id) && (
                      <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={() => toggleFavorite(item, 'hotel', idx)}
                      >
                        <Heart size={20} color={favorites[itemId] ? '#ef4444' : '#888'} />
                      </TouchableOpacity>
                    )}
                    <View style={styles.badgeContainer}>
                      <Badge label={'hotel'} variant="default" />
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
            );
          }) : <Text style={{ textAlign: 'center', color: '#888', marginVertical: 18 }}>No hotels found for this location.</Text>
        )}
        {selectedType === 'restaurant' && (
          restaurants && restaurants.length > 0 ? restaurants.map((item, idx) => {
            const anim = restaurantCardAnim.current && restaurantCardAnim.current[idx] ? restaurantCardAnim.current[idx] : new Animated.Value(1);
            const itemId = item.restaurant_id || item._id;
            return (
              <Animated.View
                key={itemId || idx}
                style={[styles.listingCard, { transform: [{ scale: anim }] }]}
              >
                <TouchableOpacity onPress={() => {}}>
                  <View style={styles.listingImageContainer}>
                    <Image source={{ uri: item.image_url || PLACEHOLDER_IMAGE }} style={styles.listingImage} />
                    {(item.restaurant_id || item._id) && (
                      <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={() => toggleFavorite(item, 'restaurant', idx)}
                      >
                        <Heart size={20} color={favorites[itemId] ? '#ef4444' : '#888'} />
                      </TouchableOpacity>
                    )}
                    <View style={styles.badgeContainer}>
                      <Badge label={'restaurant'} variant="default" />
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
            );
          }) : <Text style={{ textAlign: 'center', color: '#888', marginVertical: 18 }}>No restaurants found for this location.</Text>
        )}
        {selectedType === 'tourism' && (
          tourism && tourism.length > 0 ? tourism.map((item, idx) => {
            const anim = tourismCardAnim.current && tourismCardAnim.current[idx] ? tourismCardAnim.current[idx] : new Animated.Value(1);
            const itemId = item.place_id || item._id;
            return (
              <Animated.View
                key={itemId || idx}
                style={[styles.listingCard, { transform: [{ scale: anim }] }]}
              >
                <TouchableOpacity onPress={() => {}}>
                  <View style={styles.listingImageContainer}>
                    <Image source={{ uri: item.image_url || PLACEHOLDER_IMAGE }} style={styles.listingImage} />
                    {(item.place_id || item._id) && (
                      <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={() => toggleFavorite(item, 'tourism', idx)}
                      >
                        <Heart size={20} color={favorites[itemId] ? '#ef4444' : '#888'} />
                      </TouchableOpacity>
                    )}
                    <View style={styles.badgeContainer}>
                      <Badge label={'tourism'} variant="default" />
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
            );
          }) : <Text style={{ textAlign: 'center', color: '#888', marginVertical: 18 }}>No tourism found for this location.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default function ExploreTabWithProvider(props: any) {
  return (
    <PlacesProvider>
      <ExploreTab {...props} />
    </PlacesProvider>
  );
}
