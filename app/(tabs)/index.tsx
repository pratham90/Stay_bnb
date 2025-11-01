
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Animated, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Heart, Star, MapPin, Calendar, LogOut } from 'lucide-react-native';
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

export default function ExploreTab() {
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
            placeholder="Start your search"
            placeholderTextColor="#bbb"
          />
        </View>
      </Animated.View>

      {/* Animated Categories Row */}
      <View style={styles.categoriesRow}>
      <View style={styles.categoryItem}><MapPin size={28} color="#14b8a6" /><Text style={styles.categoryLabel}>Where</Text></View>
        <View style={styles.categoryItem}><Calendar size={28} color="#f59e42" /><Text style={styles.categoryLabel}>Check In</Text></View>
        <View style={styles.categoryItem}><LogOut size={28} color="#6366f1" /><Text style={styles.categoryLabel}>Check Out</Text></View>
      </View>

      {/* Animated Section: Popular homes */}
      <Text style={styles.sectionHeader}>Popular homes in South Goa {'>'}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {listings.slice(0,2).map((listing, idx) => (
          <Animated.View
            key={listing.id}
            style={{
              opacity: cardAnim[idx],
              transform: [{ translateY: cardAnim[idx].interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
            }}
          >
            <TouchableOpacity style={styles.popularCard}>
              <Image source={{ uri: listing.image }} style={styles.popularImage} />
              <Text style={styles.popularTitle}>{listing.title}</Text>
              <Text style={styles.popularLocation}>{listing.location}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Animated Section: Available next month */}
      <Text style={styles.sectionHeader}>Available next month in North Goa {'>'}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {listings.slice(2,4).map((listing, idx) => (
          <Animated.View
            key={listing.id}
            style={{
              opacity: cardAnim[idx+2],
              transform: [{ translateY: cardAnim[idx+2].interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
            }}
          >
            <TouchableOpacity style={styles.popularCard}>
              <Image source={{ uri: listing.image }} style={styles.popularImage} />
              <Text style={styles.popularTitle}>{listing.title}</Text>
              <Text style={styles.popularLocation}>{listing.location}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Animated Section: Stay in Bhopal */}
      <Text style={styles.sectionHeader}>Stay in Bhopal {'>'}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {listings.slice(4,5).map((listing, idx) => (
          <Animated.View
            key={listing.id}
            style={{
              opacity: cardAnim[idx+4],
              transform: [{ translateY: cardAnim[idx+4].interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
            }}
          >
            <TouchableOpacity style={styles.popularCard}>
              <Image source={{ uri: listing.image }} style={styles.popularImage} />
              <Text style={styles.popularTitle}>{listing.title}</Text>
              <Text style={styles.popularLocation}>{listing.location}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
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
