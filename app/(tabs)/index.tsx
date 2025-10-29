
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Search, SlidersHorizontal, Heart, Star, MapPin } from 'lucide-react-native';
import { Badge } from '@/components/ui/badge';

const cities = [
  { name: 'New York', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
  { name: 'Miami', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { name: 'Chicago', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80' },
  { name: 'Malibu', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80' },
  { name: 'Aspen', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80' },
];

const listings = [
  {
    id: 1,
    title: 'Modern Downtown Loft',
    location: 'New York, USA',
    price: 120,
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1594873604892-b599f847e859?auto=format&fit=crop&w=400&q=80',
    type: 'Apartment',
    host: 'Sarah',
    isFavorite: true,
    distance: '2.5 km away'
  },
  {
    id: 2,
    title: 'Cozy Beach House',
    location: 'Malibu, USA',
    price: 89,
    rating: 4.8,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1601019404210-8bb5dd3ab015?auto=format&fit=crop&w=400&q=80',
    type: 'House',
    host: 'Michael',
    isFavorite: false,
    distance: '5.8 km away'
  },
  {
    id: 3,
    title: 'Luxury Villa with Pool',
    location: 'Miami, USA',
    price: 156,
    rating: 5.0,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1694967832949-09984640b143?auto=format&fit=crop&w=400&q=80',
    type: 'Villa',
    host: 'Emma',
    isFavorite: true,
    distance: '1.2 km away'
  },
  {
    id: 4,
    title: 'Mountain Cabin Retreat',
    location: 'Aspen, USA',
    price: 78,
    rating: 4.7,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1623015522585-ddc7e066a821?auto=format&fit=crop&w=400&q=80',
    type: 'Cabin',
    host: 'David',
    isFavorite: false,
    distance: '12.4 km away'
  },
  {
    id: 5,
    title: 'City Center Studio',
    location: 'Chicago, USA',
    price: 95,
    rating: 4.6,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1664159302000-cef53d678f4f?auto=format&fit=crop&w=400&q=80',
    type: 'Studio',
    host: 'Jessica',
    isFavorite: false,
    distance: '3.7 km away'
  },
];

export default function ExperienceTab() {
  const [selectedCity, setSelectedCity] = useState('New York');
  const [favorites, setFavorites] = useState(new Set([1, 3]));
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

  const toggleFavorite = (id) => {
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
    <View style={styles.container}>
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

      {/* Experiences Grid with animation */}
      <ScrollView style={styles.listingsScroll}>
        {listings.filter(l => l.location.includes(selectedCity)).map((listing, idx) => (
          <Animated.View
            key={listing.id}
            style={{
              opacity: cardAnim[idx],
              transform: [{ translateY: cardAnim[idx].interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
            }}
          >
            <TouchableOpacity
              style={styles.listingCard}
              onPress={() => {}}
            >
              <View style={styles.listingImageContainer}>
                <Image source={{ uri: listing.image }} style={styles.listingImage} />
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => toggleFavorite(listing.id)}
                >
                  <Heart size={20} color={favorites.has(listing.id) ? '#ef4444' : '#888'} />
                </TouchableOpacity>
                <View style={styles.badgeContainer}>
                  <Badge label={listing.type} variant="default" />
                </View>
              </View>
              <View style={styles.listingInfo}>
                <View style={styles.listingTitleRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.listingTitle}>{listing.title}</Text>
                    <View style={styles.listingLocationRow}>
                      <MapPin size={14} color="#888" />
                      <Text style={styles.listingLocation}>{listing.location}</Text>
                    </View>
                  </View>
                  <View style={styles.listingRatingRow}>
                    <Star size={16} color="#facc15" />
                    <Text style={styles.listingRating}>{listing.rating}</Text>
                  </View>
                </View>
                <Text style={styles.listingDistance}>{listing.distance}</Text>
                <Text style={styles.listingPrice}>
                  ${listing.price}
                  <Text style={styles.listingPriceNight}> / night</Text>
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
