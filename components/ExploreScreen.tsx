import React, { useState, useRef, useEffect } from 'react';
import api from '../utils/api';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { Search, SlidersHorizontal, Heart, Star, MapPin } from 'lucide-react-native';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useUser } from '../context/UserContext';

interface Listing {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  type: string;
  host: string;
  isFavorite: boolean;
  distance: string;
}

interface ExploreScreenProps {
  onListingClick: (id: number) => void;
}

export function ExploreScreen({ onListingClick }: ExploreScreenProps) {
    const { user, fetchUserLikes, isLoggedIn } = useUser();
  const [selectedCity, setSelectedCity] = useState('New York');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchFocused, setSearchFocused] = useState(false);
  const [placeType, setPlaceType] = useState<'hotels' | 'restaurants' | 'tourism'>('hotels');
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const cities = [
    { name: 'New York', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
    { name: 'Miami', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { name: 'Chicago', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80' },
    { name: 'Malibu', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80' },
    { name: 'Aspen', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80' },
  ];

  // Animation refs for cities and cards
  const cityAnim = useRef(cities.map(() => new Animated.Value(0))).current;
  const cardAnim = useRef([1,2,3,4,5].map(() => new Animated.Value(0))).current;

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


  // Fetch places from backend
  useEffect(() => {
    async function fetchPlaces() {
      setLoading(true);
      setPlaces([]);
      let endpoint = '';
      if (placeType === 'hotels') endpoint = 'hotels';
      else if (placeType === 'restaurants') endpoint = 'restaurants';
      else if (placeType === 'tourism') endpoint = 'tourism';
      try {
        const { data } = await api.get(`/api/${endpoint}?location=${encodeURIComponent(selectedCity)}&limit=20`);
        if (data.success && Array.isArray(data.data)) {
          setPlaces(data.data);
        } else {
          setPlaces([]);
        }
      } catch {
        setPlaces([]);
      }
      setLoading(false);
    }
    fetchPlaces();
  }, [selectedCity, placeType]);

  const toggleFavorite = (key: string) => {
    if (!isLoggedIn || !user?.clerk_id) {
      alert('You must be signed in to save favorites.');
      return;
    }
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      const place = places.find(
        (item, idx) => String(item._id || item.id || item.name || idx) === key
      );
      if (!place) return newFavorites;
      // Always use plural category for backend
      let category = placeType;
      if (category === 'hotels' || category === 'restaurants' || category === 'tourism') {
        // ok
      } else if (category === 'hotel') {
        category = 'hotels';
      } else if (category === 'restaurant') {
        category = 'restaurants';
      }
      if (newFavorites.has(key)) {
        // Remove from favorites (dislike)
        if (key) {
          api.delete(`/api/users/${user.clerk_id}/likes/${category}/${key}`)
            .then(() => fetchUserLikes(user.clerk_id));
          newFavorites.delete(key);
        } else {
          console.warn('Cannot remove favorite: hotel ID (key) is undefined');
        }
      } else {
        // Add to favorites (like)
        api.post(`/api/users/${user.clerk_id}/likes/${category}`, {
          item_id: key,
          name: place.name || place.title || '',
          image_url: place.image || '',
          type: category,
        }).then(() => fetchUserLikes(user.clerk_id));
        newFavorites.add(key);
      }
      return newFavorites;
    });
  }

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBarRow}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              placeholder={`Search experiences in ${selectedCity}`}
              style={styles.searchInput}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <SlidersHorizontal size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </View>

      {/* City selector with animation */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.citiesScroll}>
        {cities.map((city, idx) => (
          <Animated.View
            key={city.name}
            style={{
              opacity: cityAnim[idx],
              transform: [{ scale: cityAnim[idx].interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }],
            }}
          >
            <TouchableOpacity
              style={[styles.cityChip, selectedCity === city.name && styles.cityChipSelected]}
              onPress={() => setSelectedCity(city.name)}
            >
              <Image source={{ uri: city.image }} style={styles.cityImage} />
              <Text style={[styles.cityText, selectedCity === city.name && styles.cityTextSelected]}>{city.name}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Place type selector */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10, gap: 8 }}>
        <TouchableOpacity onPress={() => setPlaceType('hotels')} style={{ backgroundColor: placeType === 'hotels' ? '#2dd4bf' : '#f3f4f6', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 8 }}>
          <Text style={{ color: placeType === 'hotels' ? '#fff' : '#222', fontWeight: 'bold' }}>Hotels</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPlaceType('restaurants')} style={{ backgroundColor: placeType === 'restaurants' ? '#2dd4bf' : '#f3f4f6', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 8 }}>
          <Text style={{ color: placeType === 'restaurants' ? '#fff' : '#222', fontWeight: 'bold' }}>Restaurants</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPlaceType('tourism')} style={{ backgroundColor: placeType === 'tourism' ? '#2dd4bf' : '#f3f4f6', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 8 }}>
          <Text style={{ color: placeType === 'tourism' ? '#fff' : '#222', fontWeight: 'bold' }}>Tourist Attractions</Text>
        </TouchableOpacity>
      </View>
      {/* Real places list from backend */}
      {loading ? (
        <ActivityIndicator size="large" color="#2dd4bf" style={{ marginTop: 24 }} />
      try {
        const { data } = await api.get(`/api/users/${clerkId}/likes`);
        if (data.success && data.liked) {
          setLikes(data.liked);
        } else {
          setLikes({});
        }
      } catch (err: any) {
        setError(err.message || 'Unknown error');
        setLikes({});
      } finally {
        setLoading(false);
      }
                  transform: [{ translateY: cardAnim[idx % cardAnim.length].interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
                }}
              >
                <TouchableOpacity
                  style={styles.listingCard}
                  onPress={() => onListingClick(item._id || item.id || idx)}
                >
                  <View style={styles.listingImageContainer}>
                    <Image source={{ uri: item.image || 'https://placehold.co/400x200?text=No+Image' }} style={styles.listingImage} />
                    <TouchableOpacity
                      style={styles.favoriteButton}
                      onPress={() => toggleFavorite(key)}
                      disabled={!isLoggedIn || !user?.clerk_id}
                    >
                      <Heart size={20} color={favorites.has(key) ? '#ef4444' : '#888'} />
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
                        return (
                          <ScrollView style={styles.container}>
                            {/* ...existing code... */}
                            <View style={styles.placesSection}>
                              {loading ? (
                                <ActivityIndicator size="large" color="#06b6d4" style={{ marginTop: 40 }} />
                              ) : (
                                places.map((place, idx) => {
                                  const key = String(place._id || place.id || place.name || idx);
                                  // Check if liked in context likes
                                  const isLiked = (user?.liked?.[placeType]?.some((item: any) => item.item_id === key));
                                  return (
                                    <Animated.View key={key} style={{ ...styles.card, opacity: cardAnim[idx % cardAnim.length] }}>
                                      <TouchableOpacity onPress={() => onListingClick(place.id)}>
                                        <Image source={{ uri: place.image }} style={styles.cardImage} />
                                        <View style={styles.cardContent}>
                                          <Text style={styles.cardTitle}>{place.title || place.name}</Text>
                                          <Text style={styles.cardLocation}><MapPin size={16} color="#06b6d4" /> {place.location}</Text>
                                          <View style={styles.cardRow}>
                                            <Text style={styles.cardPrice}>${place.price}/night</Text>
                                            <Text style={styles.cardRating}><Star size={16} color="#facc15" /> {place.rating} ({place.reviews})</Text>
                                          </View>
                                        </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity style={styles.heartBtn} onPress={() => toggleFavorite(key)}>
                                        {isLiked ? <Heart size={24} color="#ef4444" fill="#ef4444" /> : <Heart size={24} color="#888" />}
                                      </TouchableOpacity>
                                    </Animated.View>
                                  );
                                })
                              )}
                            </View>
                            {/* ...existing code... */}
                          </ScrollView>
                        );
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#222',
  },
  filterButton: {
      {loading ? (
        <ActivityIndicator size="large" color="#2dd4bf" style={{ marginTop: 24 }} />
      ) : places.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#888', marginTop: 32 }}>No results found.</Text>
      ) : (
        <ScrollView style={styles.listingsScroll}>
          {places.map((item, idx) => {
            // Always use a string key for consistency
            const key = String(item._id || item.id || item.name || idx);
            return (
              <Animated.View
                key={key}
                style={{
                  opacity: cardAnim[idx % cardAnim.length],
                  transform: [{ translateY: cardAnim[idx % cardAnim.length].interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
                }}
              >
                {/* ...existing code... */}
              </Animated.View>
            );
          })}
        </ScrollView>
      )}
    shadowRadius: 4,
  },
  cityImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 4,
  },
  cityText: {
    color: '#222',
    fontWeight: '500',
    fontSize: 15,
  },
  cityTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listingsScroll: {
    flex: 1,
    paddingHorizontal: 8,
  },
  listingCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  listingImageContainer: {
    position: 'relative',
    borderRadius: 24,
    overflow: 'hidden',
  },
  listingImage: {
    width: '100%',
    height: 180,
    borderRadius: 24,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  listingInfo: {
    padding: 16,
  },
  listingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  listingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  listingLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  listingLocation: {
    fontSize: 13,
    color: '#888',
    marginLeft: 4,
  },
  listingRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  listingRating: {
    fontSize: 13,
    color: '#facc15',
    marginLeft: 2,
  },
  listingDistance: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  listingPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginTop: 4,
  },
  listingPriceNight: {
    fontSize: 13,
    color: '#888',
  },
});
