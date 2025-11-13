import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
export function ListingDetails({ listingId, onBack, onChatClick, listing }: { listingId: number; onBack: () => void; onChatClick: () => void; listing: any }) {
  // listing: { item_id, name, image_url, type }
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useUser();

  const handleLikeToggle = async () => {
    if (!user) return;
    const category = listing.type?.toLowerCase() || 'hotels';
    const url = `http://192.168.100.2:8000/api/users/${user.clerk_id}/likes/${category}`;
    if (!isFavorite) {
      // Like
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item_id: listing.item_id,
          name: listing.name,
          image_url: listing.image_url,
          type: listing.type
        })
      });
      setIsFavorite(true);
    } else {
      // Dislike
      await fetch(`${url}/${listing.item_id}`, { method: 'DELETE' });
      setIsFavorite(false);
    }
  };

  const images = [
    'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjEzMTc0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1664159302000-cef53d678f4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbG9mdCUyMGFwYXJ0bWVudHxlbnwxfHx8fDE3NjEzMjM2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1601019404210-8bb5dd3ab015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdXNlJTIwdmFjYXRpb258ZW58MXx8fHwxNzYxMzIzNjE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  const amenities = [
    { icon: 'wifi', label: 'Free Wifi' },
    { icon: 'car', label: 'Parking' },
    { icon: 'coffee', label: 'Kitchen' },
    { icon: 'tv', label: 'TV' },
  ];

  const reviews = [
    {
      id: 1,
      author: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      date: '2 weeks ago',
      text: 'Amazing place! Everything was exactly as described. The location is perfect and the host was very responsive.'
    },
    {
      id: 2,
      author: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      date: '1 month ago',
      text: 'Loved our stay here. The apartment is beautiful and very clean. Would definitely recommend!'
    },
  ];


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  headerBtn: { backgroundColor: '#fff', borderRadius: 20, padding: 8, elevation: 2, marginHorizontal: 4 },
  headerRight: { flexDirection: 'row' },
  carousel: { position: 'relative', width: '100%', height: 220, marginBottom: 8 },
  carouselImage: { width: '100%', height: 220, borderRadius: 16 },
  carouselNav: { position: 'absolute', top: '45%', left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 },
  carouselNavBtn: { backgroundColor: '#fff', borderRadius: 20, padding: 6, elevation: 2 },
  carouselIndicators: { position: 'absolute', bottom: 12, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' },
  carouselIndicator: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#eee', marginHorizontal: 2 },
  carouselIndicatorActive: { backgroundColor: '#06b6d4' },
  content: { flex: 1, padding: 16 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#222' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  location: { fontSize: 14, color: '#888', marginLeft: 4 },
  badge: { backgroundColor: '#06b6d4', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2, marginLeft: 8 },
  badgeText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  rating: { fontSize: 14, color: '#facc15', marginLeft: 2 },
  dot: { color: '#888', marginHorizontal: 4 },
  reviews: { fontSize: 13, color: '#888' },
  superhost: { fontSize: 13, color: '#888' },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 8 },
  price: { fontSize: 20, fontWeight: 'bold', color: '#222' },
  priceNight: { fontSize: 14, color: '#888', marginLeft: 4 },
  hostRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: 16, padding: 12, marginTop: 16 },
  hostAvatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  hostName: { fontSize: 15, fontWeight: 'bold', color: '#222' },
  hostJoined: { fontSize: 12, color: '#888' },
  chatBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e0f7fa', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  chatBtnText: { color: '#06b6d4', fontWeight: 'bold', marginLeft: 4 },
  detailsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  detailItem: { flex: 1, alignItems: 'center', padding: 8, backgroundColor: '#f3f4f6', borderRadius: 12, marginHorizontal: 4 },
  detailText: { fontSize: 13, color: '#888', marginTop: 4 },
  amenitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 16 },
  amenityItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: 12, padding: 8, margin: 4 },
  amenityText: { fontSize: 13, color: '#888', marginLeft: 8 },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#222' },
  sectionText: { fontSize: 14, color: '#666', lineHeight: 20 },
  reviewCard: { backgroundColor: '#f3f4f6', borderRadius: 16, padding: 12, marginBottom: 12 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  reviewAvatar: { width: 32, height: 32, borderRadius: 16, marginRight: 8 },
  reviewAuthor: { fontSize: 14, fontWeight: 'bold', color: '#222' },
  reviewDate: { fontSize: 12, color: '#888' },
  reviewRating: { flexDirection: 'row', alignItems: 'center', marginLeft: 8 },
  reviewRatingText: { fontSize: 12, color: '#facc15', marginLeft: 2 },
  reviewText: { fontSize: 13, color: '#666', marginTop: 4 },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  bottomBtnOutline: { flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#06b6d4', borderRadius: 20, padding: 12, marginRight: 8, backgroundColor: '#fff' },
  bottomBtnFilled: { flex: 1, alignItems: 'center', backgroundColor: '#06b6d4', borderRadius: 20, padding: 12 },
  bottomBtnText: { color: '#06b6d4', fontWeight: 'bold', marginLeft: 6 },
  bottomBtnTextFilled: { color: '#fff', fontWeight: 'bold' },
});

// ...existing code...

export function ListingDetails({ listingId, onBack, onChatClick }: { listingId: number; onBack: () => void; onChatClick: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjEzMTc0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1664159302000-cef53d678f4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbG9mdCUyMGFwYXJ0bWVudHxlbnwxfHx8fDE3NjEzMjM2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1601019404210-8bb5dd3ab015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdXNlJTIwdmFjYXRpb258ZW58MXx8fHwxNzYxMzIzNjE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  const amenities = [
    { icon: 'wifi', label: 'Free Wifi' },
    { icon: 'car', label: 'Parking' },
    { icon: 'coffee', label: 'Kitchen' },
    { icon: 'tv', label: 'TV' },
  ];

  const reviews = [
    {
      id: 1,
      author: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      date: '2 weeks ago',
      text: 'Amazing place! Everything was exactly as described. The location is perfect and the host was very responsive.'
    },
    {
      id: 2,
      author: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      date: '1 month ago',
      text: 'Loved our stay here. The apartment is beautiful and very clean. Would definitely recommend!'
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerBtn}>
            <Feather name="share" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn} onPress={handleLikeToggle}>
            <Feather name="heart" size={22} color={isFavorite ? "#ef4444" : "#333"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Image Carousel */}
      <View style={styles.carousel}>
        <Image source={{ uri: images[currentImageIndex] }} style={styles.carouselImage} />
        <View style={styles.carouselNav}>
          <TouchableOpacity style={styles.carouselNavBtn} onPress={prevImage}>
            <Feather name="chevron-left" size={28} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.carouselNavBtn} onPress={nextImage}>
            <Feather name="chevron-right" size={28} color="#333" />
          </TouchableOpacity>
        </View>
        <View style={styles.carouselIndicators}>
          {images.map((_, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.carouselIndicator, idx === currentImageIndex && styles.carouselIndicatorActive]}
              onPress={() => setCurrentImageIndex(idx)}
            />
          ))}
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Title & Price */}
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Modern Downtown Loft</Text>
            <View style={styles.locationRow}>
              <Feather name="map-pin" size={16} color="#888" />
              <Text style={styles.location}>New York, USA</Text>
            </View>
          </View>
          <View style={styles.badge}><Text style={styles.badgeText}>Featured</Text></View>
        </View>
        <View style={styles.ratingRow}>
          <Feather name="star" size={16} color="#facc15" />
          <Text style={styles.rating}>4.9</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.reviews}>128 reviews</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.superhost}>Superhost</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>$120</Text>
          <Text style={styles.priceNight}> / night</Text>
        </View>

        {/* Host Info */}
        <View style={styles.hostRow}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1539605480396-a61f99da1041?w=100' }} style={styles.hostAvatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.hostName}>Hosted by Sarah</Text>
            <Text style={styles.hostJoined}>Joined 3 years ago</Text>
          </View>
          <TouchableOpacity style={styles.chatBtn} onPress={onChatClick}>
            <Feather name="message-circle" size={18} color="#06b6d4" />
            <Text style={styles.chatBtnText}>Chat</Text>
          </TouchableOpacity>
        </View>

        {/* Details */}
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}><Feather name="user" size={20} color="#888" /><Text style={styles.detailText}>4 guests</Text></View>
          <View style={styles.detailItem}><Feather name="home" size={20} color="#888" /><Text style={styles.detailText}>2 beds</Text></View>
          <View style={styles.detailItem}><Feather name="droplet" size={20} color="#888" /><Text style={styles.detailText}>1 bath</Text></View>
        </View>

        {/* Amenities */}
        <View style={styles.amenitiesGrid}>
          {amenities.map((amenity, idx) => (
            <View key={idx} style={styles.amenityItem}>
              <Feather name={
                amenity.icon === 'wifi' ? 'wifi' :
                amenity.icon === 'car' ? 'key' :
                amenity.icon === 'coffee' ? 'coffee' :
                amenity.icon === 'tv' ? 'tv' :
                'circle'
              } size={18} color="#888" />
              <Text style={styles.amenityText}>{amenity.label}</Text>
            </View>
          ))}
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this place</Text>
          <Text style={styles.sectionText}>
            Experience urban luxury in this stunning downtown loft. Features floor-to-ceiling windows, modern amenities, and proximity to the city's best attractions. Perfect for couples or small families looking to explore the city in style.
          </Text>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewAuthor}>{review.author}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <View style={styles.reviewRating}><Feather name="star" size={14} color="#facc15" /><Text style={styles.reviewRatingText}>{review.rating}</Text></View>
              </View>
              <Text style={styles.reviewText}>{review.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBtnOutline}>
          <Feather name="calendar" size={18} color="#06b6d4" />
          <Text style={styles.bottomBtnText}>Check Dates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBtnFilled}>
          <Text style={styles.bottomBtnTextFilled}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


      