import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import { Heart } from 'lucide-react-native';
import api from '../utils/api';

export function ProfileScreen() {
  const { user, likes, fetchUserLikes } = useUser();
  const [localImage, setLocalImage] = useState<string | null>(null);
  const [savedVisible, setSavedVisible] = useState(false);
  const [selectedCat, setSelectedCat] = useState<'hotels' | 'restaurants' | 'tourism'>('hotels');
  useEffect(() => {
    if (user?.clerk_id) fetchUserLikes(user.clerk_id);
  }, [user?.clerk_id]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setLocalImage(result.assets[0].uri);
    }
  };
  const menuItems = [
    { icon: 'settings', label: 'Account Settings', badge: null },
    { icon: 'heart', label: 'Saved', badge: 12 },
    { icon: 'calendar', label: 'Bookings', badge: 3 },
    { icon: 'home', label: 'My Listings', badge: null },
    { icon: 'credit-card', label: 'Payment Methods', badge: null },
    { icon: 'help-circle', label: 'Help Center', badge: null },
  ];

  const stats = [
    { label: 'Reviews', value: '24' },
    { label: 'Rating', value: '4.9' },
    { label: 'Trips', value: '18' },
  ];

  const activities = [
    { action: 'Booked', place: 'Beach House in Malibu', time: '2 days ago', image: 'https://images.unsplash.com/photo-1601019404210-8bb5dd3ab015?w=100' },
    { action: 'Reviewed', place: 'Mountain Cabin', time: '1 week ago', image: 'https://images.unsplash.com/photo-1623015522585-ddc7e066a821?w=100' },
  ];

  const getItemId = (item: any, cat: string) => {
    if (cat === 'hotels') return item.hotel_id || item.item_id || item._id;
    if (cat === 'restaurants') return item.restaurant_id || item.item_id || item._id;
    if (cat === 'tourism') return item.place_id || item.item_id || item._id;
    return item.item_id || item._id;
  };
  const getCategory = (cat: string) => {
    if (cat === 'hotels') return 'hotels';
    if (cat === 'restaurants') return 'restaurants';
    if (cat === 'tourism') return 'tourism';
    return cat;
  };
  const toggleFavorite = async (item: any, cat: string) => {
    if (!user?.clerk_id) return;
    const category = getCategory(cat);
    const itemId = getItemId(item, cat);
    if (!itemId) return;
    // Check if item is currently liked
    const isLiked = likes?.[cat]?.some((liked: any) => getItemId(liked, cat) === itemId);
    try {
      if (isLiked) {
        await api.delete(`/api/users/${user.clerk_id}/likes/${category}/${itemId}`);
      } else {
        await api.post(`/api/users/${user.clerk_id}/likes/${category}`, {
          item_id: itemId,
          name: item.name,
          image_url: item.image_url,
          type: category,
        });
      }
      fetchUserLikes(user.clerk_id);
    } catch (e) {
      console.error('Error toggling favorite:', e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerBg}>
        <View style={styles.headerContent}>
          <View style={styles.avatarWrapper}>
            <Image
              source={localImage ? { uri: localImage } : { uri: 'https://images.unsplash.com/photo-1539605480396-a61f99da1041?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXQlMjBwZXJzb258ZW58MXx8fHwxNzYxMjI1MTE4fDA&ixlib=rb-4.1.0&q=80&w=1080' }}
              style={styles.avatar}
            />
            <TouchableOpacity onPress={pickImage} style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: '#fff', borderRadius: 16, padding: 6, elevation: 2 }}>
              <Feather name="camera" size={18} color="#06b6d4" />
            </TouchableOpacity>
           
          </View>
          <Text style={styles.name}>{user?.name || 'No Name'}</Text>
          <Text style={styles.email}>{user?.email || 'No Email'}</Text>
          {/* ...existing code... */}
        </View>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item, idx) => (
          <TouchableOpacity
            key={item.label}
            style={styles.menuItem}
            onPress={item.label === 'Saved' ? () => setSavedVisible(true) : undefined}
          >
            <View style={styles.menuIconWrapper}>
              <Feather name={item.icon as any} size={22} color="#06b6d4" />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <View style={styles.menuRight}>
            
              <Feather name="chevron-right" size={20} color="#888" />
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.logoutBtn}>
          <View style={styles.logoutIconWrapper}>
            <Feather name="log-out" size={22} color="#ef4444" />
          </View>
          <Text style={styles.logoutLabel}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* SAVED/LIKED ITEMS MODAL */}
      <Modal
        visible={savedVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setSavedVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
          <View style={{ backgroundColor: '#06b6d4', paddingTop: 48, paddingBottom: 24, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 4 }}>Saved Places</Text>
            <Text style={{ color: '#e0f2fe', fontSize: 15 }}>All your liked hotels, restaurants, and tourism spots</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 12 }}>
            {['hotels', 'restaurants', 'tourism'].map((cat) => (
              <TouchableOpacity
                key={cat}
                style={{
                  backgroundColor: selectedCat === cat ? '#06b6d4' : '#e0f2fe',
                  borderRadius: 18,
                  paddingHorizontal: 18,
                  paddingVertical: 8,
                  marginHorizontal: 6,
                  elevation: selectedCat === cat ? 2 : 0,
                }}
                onPress={() => setSelectedCat(cat)}
              >
                <Text style={{ color: selectedCat === cat ? '#fff' : '#06b6d4', fontWeight: 'bold', fontSize: 15 }}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
            {likes?.[selectedCat]?.length > 0 ? likes[selectedCat].map((item: any) => {
              const itemId = getItemId(item, selectedCat);
              const isLiked = likes?.[selectedCat]?.some((liked: any) => getItemId(liked, selectedCat) === itemId);
              return (
                <View key={itemId} style={{ backgroundColor: '#fff', borderRadius: 18, padding: 16, marginBottom: 14, flexDirection: 'row', alignItems: 'center', shadowColor: '#06b6d4', shadowOpacity: 0.10, shadowRadius: 12, elevation: 4 }}>
                  <Image source={{ uri: item.image_url }} style={{ width: 72, height: 72, borderRadius: 14, marginRight: 16, backgroundColor: '#eee' }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: '#222', fontSize: 17 }}>{item.name}</Text>
                    <Text style={{ color: '#06b6d4', fontSize: 14, fontWeight: '600', marginTop: 2 }}>{item.type || selectedCat}</Text>
                  </View>
                  <TouchableOpacity onPress={() => toggleFavorite(item, selectedCat)} style={{ marginLeft: 8 }}>
                    <Heart size={32} color={isLiked ? '#ef4444' : '#888'} fill={isLiked ? '#ef4444' : 'none'} />
                  </TouchableOpacity>
                </View>
              );
            }) : <Text style={{ color: '#888', fontSize: 15, textAlign: 'center', marginTop: 32 }}>No saved {selectedCat}.</Text>}
          </ScrollView>
          <TouchableOpacity onPress={() => setSavedVisible(false)} style={{ alignSelf: 'center', marginVertical: 16, backgroundColor: '#06b6d4', borderRadius: 20, paddingHorizontal: 32, paddingVertical: 12, elevation: 2 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.activitySection}>
        <Text style={styles.activityTitle}>Recent Activity</Text>
        {activities.map((activity, idx) => (
          <View key={idx} style={styles.activityItem}>
            <Image source={{ uri: activity.image }} style={styles.activityImage} />
            <View style={styles.activityInfo}>
              <Text style={styles.activityText}>
                <Text style={styles.activityAction}>{activity.action}</Text> {activity.place}
              </Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#888" />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  headerBg: { backgroundColor: '#06b6d4', paddingTop: 48, paddingBottom: 24, paddingHorizontal: 16, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  headerContent: { alignItems: 'center' },
  avatarWrapper: { position: 'relative', marginBottom: 12 },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 4, borderColor: '#fff', backgroundColor: '#eee' },
  starBadge: { position: 'absolute', bottom: -8, right: -8, backgroundColor: '#fff', borderRadius: 16, padding: 4, elevation: 2 },
  name: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: 8 },
  email: { color: '#fff', opacity: 0.8, fontSize: 14, marginTop: 2 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  locationText: { color: '#fff', fontSize: 14, marginLeft: 4 },
  superhostBadge: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4, marginTop: 10 },
  superhostText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, width: '100%' },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: '#fff', opacity: 0.7, fontSize: 12, marginTop: 2 },
  menuSection: { marginTop: 24, paddingHorizontal: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, elevation: 1 },
  menuIconWrapper: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#e0f7fa', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  menuLabel: { flex: 1, fontSize: 15, color: '#222' },
  menuRight: { flexDirection: 'row', alignItems: 'center' },
  menuBadge: { backgroundColor: '#06b6d4', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2, marginRight: 8 },
  menuBadgeText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, elevation: 1 },
  logoutIconWrapper: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#fee2e2', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  logoutLabel: { fontSize: 15, color: '#ef4444', fontWeight: 'bold' },
  activitySection: { marginTop: 16, paddingHorizontal: 16 },
  activityTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#222' },
  activityItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 12, marginBottom: 10, elevation: 1 },
  activityImage: { width: 56, height: 56, borderRadius: 12, marginRight: 12 },
  activityInfo: { flex: 1 },
  activityText: { fontSize: 14, color: '#222' },
  activityAction: { color: '#06b6d4', fontWeight: 'bold' },
  activityTime: { fontSize: 12, color: '#888', marginTop: 2 },
});
