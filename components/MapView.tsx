
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface BookingMarker {
  id: number;
  lat: number;
  lng: number;
  price: string;
  title: string;
  image: string;
  type: string;
}

interface MapViewProps {
  onListingClick: (id: number) => void;
  onListView: () => void;
}

export function MapView({ onListingClick, onListView }: MapViewProps) {
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const markers: BookingMarker[] = [
    { id: 1, lat: 40, lng: 30, price: '$120', title: 'Modern Downtown Loft', image: 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjEzMTc0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080', type: 'Apartment' },
    { id: 2, lat: 60, lng: 50, price: '$89', title: 'Cozy Beach House', image: 'https://images.unsplash.com/photo-1601019404210-8bb5dd3ab015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdXNlJTIwdmFjYXRpb258ZW58MXx8fHwxNzYxMzIzNjE2fDA&ixlib=rb-4.1.0&q=80&w=1080', type: 'House' },
    { id: 3, lat: 45, lng: 70, price: '$156', title: 'Luxury Villa', image: 'https://images.unsplash.com/photo-1694967832949-09984640b143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2x8ZW58MXx8fHwxNzYxMjUwNTc0fDA&ixlib=rb-4.1.0&q=80&w=1080', type: 'Villa' },
    { id: 4, lat: 35, lng: 65, price: '$78', title: 'Mountain Cabin', image: 'https://images.unsplash.com/photo-1623015522585-ddc7e066a821?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWJpbiUyMHdvb2RzJTIwbmF0dXJlfGVufDF8fHx8MTc2MTMyMzYxN3ww&ixlib=rb-4.1.0&q=80&w=1080', type: 'Cabin' },
    { id: 5, lat: 55, lng: 40, price: '$95', title: 'City Center Studio', image: 'https://images.unsplash.com/photo-1664159302000-cef53d678f4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbG9mdCUyMGFwYXJ0bWVudHxlbnwxfHx8fDE3NjEzMjM2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080', type: 'Studio' },
  ];

  const handleMarkerClick = (id: number) => {
    setSelectedMarker(id);
  };

  const selectedListing = markers.find(m => m.id === selectedMarker);
  const { width, height } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1539605480396-a61f99da1041?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXQlMjBwZXJzb258ZW58MXx8fHwxNzYxMjI1MTE4fDA&ixlib=rb-4.1.0&q=80&w=1080' }}
          style={styles.avatar}
        />
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#888" />
          <Text style={styles.searchText}>Where to?</Text>
        </View>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setShowFilters(!showFilters)}>
          <Feather name="filter" size={20} color="#06b6d4" />
        </TouchableOpacity>
      </View>

      {/* Travelers badge */}
      <View style={styles.travelersBadge}>
        <View style={styles.travelersDot} />
        <Text style={styles.travelersText}>Travelers Here</Text>
      </View>

      {/* Map Markers (simulated positions) */}
      <View style={styles.mapArea}>
        {markers.map((marker) => (
          <TouchableOpacity
            key={marker.id}
            style={{
              position: 'absolute',
              left: `${marker.lng}%`,
              top: `${marker.lat}%`,
              transform: [{ translateX: -20 }, { translateY: -20 }],
              zIndex: selectedMarker === marker.id ? 2 : 1,
            }}
            onPress={() => handleMarkerClick(marker.id)}
          >
            {selectedMarker === marker.id ? (
              <View style={styles.selectedMarker}>
                <Image source={{ uri: marker.image }} style={styles.markerImage} />
              </View>
            ) : (
              <View style={styles.markerPrice}>
                <Text style={styles.markerPriceText}>{marker.price}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Selected Listing Card */}
      {selectedListing && (
        <TouchableOpacity style={styles.listingCard} onPress={() => onListingClick(selectedListing.id)}>
          <Image source={{ uri: selectedListing.image }} style={styles.listingImage} />
          <View style={styles.listingInfo}>
            <Text style={styles.listingTitle}>{selectedListing.title}</Text>
            <Text style={styles.listingType}>{selectedListing.type} • Available Now</Text>
            <View style={styles.listingStats}>
              <Text style={styles.listingStat}>★ 4.9</Text>
              <Text style={styles.listingDot}>•</Text>
              <Text style={styles.listingReviews}>128 reviews</Text>
            </View>
            <View style={styles.listingPriceBadge}>
              <Text style={styles.listingPriceText}>{selectedListing.price}/night</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.listBtn} onPress={onListView}>
          <Feather name="list" size={20} color="#fff" />
          <Text style={styles.listBtnText}>List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn}>
          <Feather name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Location Button */}
      <TouchableOpacity style={styles.locationBtn}>
        <Feather name="navigation" size={24} color="#06b6d4" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e0f2fe' },
  topBar: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: 'transparent', zIndex: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#fff', marginRight: 8 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8, elevation: 2 },
  searchText: { color: '#888', marginLeft: 8, fontSize: 15 },
  filterBtn: { backgroundColor: '#fff', padding: 8, borderRadius: 20, elevation: 2 },
  travelersBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#06b6d4', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6, marginLeft: 56, marginTop: 8, alignSelf: 'flex-start', elevation: 2 },
  travelersDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff', marginRight: 8 },
  travelersText: { color: '#fff', fontSize: 14 },
  mapArea: { flex: 1, position: 'relative', width: '100%', height: '100%' },
  markerPrice: { backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 2, borderColor: '#222', elevation: 2 },
  markerPriceText: { fontWeight: 'bold', color: '#222' },
  selectedMarker: { backgroundColor: '#fff', borderRadius: 20, padding: 4, elevation: 4 },
  markerImage: { width: 40, height: 40, borderRadius: 20 },
  listingCard: { position: 'absolute', left: 16, right: 16, bottom: 120, backgroundColor: '#fff', borderRadius: 24, elevation: 4, flexDirection: 'row', overflow: 'hidden', zIndex: 20 },
  listingImage: { width: 120, height: 120, borderTopLeftRadius: 24, borderBottomLeftRadius: 24 },
  listingInfo: { flex: 1, padding: 12, justifyContent: 'center' },
  listingTitle: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  listingType: { fontSize: 14, color: '#888', marginTop: 2 },
  listingStats: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  listingStat: { fontSize: 13, color: '#facc15', marginRight: 4 },
  listingDot: { color: '#888', marginHorizontal: 4 },
  listingReviews: { fontSize: 13, color: '#888' },
  listingPriceBadge: { backgroundColor: '#06b6d4', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2, alignSelf: 'flex-start', marginTop: 8 },
  listingPriceText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  bottomControls: { position: 'absolute', left: 0, right: 0, bottom: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  listBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#222', borderRadius: 20, paddingHorizontal: 24, paddingVertical: 12, marginRight: 12 },
  listBtnText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },
  addBtn: { backgroundColor: '#06b6d4', borderRadius: 20, padding: 12, alignItems: 'center', justifyContent: 'center' },
  locationBtn: { position: 'absolute', right: 16, bottom: 180, backgroundColor: '#fff', borderRadius: 20, padding: 12, elevation: 3, zIndex: 10 },
});
