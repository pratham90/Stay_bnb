import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Search, SlidersHorizontal, Heart, Star, MapPin } from 'lucide-react-native';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<Set<number>>(new Set([1, 3]));
  const [searchFocused, setSearchFocused] = useState(false);

  const categories = ['All', 'Amazing views', 'Beachfront', 'Cabins', 'Trending', 'Luxury'];

  // Animation refs for chips and cards
  const chipAnim = useRef(categories.map(() => new Animated.Value(0))).current;
  const cardAnim = useRef([1,2,3,4,5].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(80, chipAnim.map(anim =>
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
  }, [chipAnim, cardAnim]);

  const listings: Listing[] = [
    {
      id: 1,
      title: 'Modern Downtown Loft',
      location: 'New York, USA',
      price: 120,
      rating: 4.9,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjEzMTc0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
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
      image: 'https://images.unsplash.com/photo-1601019404210-8bb5dd3ab015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdXNlJTIwdmFjYXRpb258ZW58MXx8fHwxNzYxMzIzNjE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
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
      image: 'https://images.unsplash.com/photo-1694967832949-09984640b143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2x8ZW58MXx8fHwxNzYxMjUwNTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
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
      image: 'https://images.unsplash.com/photo-1623015522585-ddc7e066a821?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWJpbiUyMHdvb2RzJTIwbmF0dXJlfGVufDF8fHx8MTc2MTMyMzYxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
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
      image: 'https://images.unsplash.com/photo-1664159302000-cef53d678f4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbG9mdCUyMGFwYXJ0bWVudHxlbnwxfHx8fDE3NjEzMjM2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'Studio',
      host: 'Jessica',
      isFavorite: false,
      distance: '3.7 km away'
    },
  ];

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
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBarRow}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              placeholder="Search destinations"
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

      {/* Categories with animation */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
        {categories.map((category, idx) => (
          <Animated.View
            key={category}
            style={{
              opacity: chipAnim[idx],
              transform: [{ translateY: chipAnim[idx].interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
            }}
          >
            <TouchableOpacity
              style={[styles.categoryChip, selectedCategory === category && styles.categoryChipSelected]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextSelected]}>{category}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Listings Grid with animation */}
      <ScrollView style={styles.listingsScroll}>
        {listings.map((listing, idx) => (
          <Animated.View
            key={listing.id}
            style={{
              opacity: cardAnim[idx],
              transform: [{ translateY: cardAnim[idx].interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
            }}
          >
            <TouchableOpacity
              style={styles.listingCard}
              onPress={() => onListingClick(listing.id)}
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
  searchHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
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
    padding: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
  },
  categoriesScroll: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: '#2dd4bf',
    shadowColor: '#2dd4bf',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  categoryText: {
    color: '#222',
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#fff',
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
