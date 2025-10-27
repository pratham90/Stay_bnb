
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export function ProfileScreen() {
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerBg}>
        <View style={styles.headerContent}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1539605480396-a61f99da1041?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXQlMjBwZXJzb258ZW58MXx8fHwxNzYxMjI1MTE4fDA&ixlib=rb-4.1.0&q=80&w=1080' }}
              style={styles.avatar}
            />
            <View style={styles.starBadge}>
              <Feather name="star" size={18} color="#facc15" />
            </View>
          </View>
          <Text style={styles.name}>Sarah Anderson</Text>
          <Text style={styles.email}>sarah.anderson@email.com</Text>
          <View style={styles.locationRow}>
            <Feather name="map-pin" size={16} color="#fff" />
            <Text style={styles.locationText}>New York, USA</Text>
          </View>
          <View style={styles.superhostBadge}>
            <Text style={styles.superhostText}>Superhost</Text>
          </View>
          <View style={styles.statsRow}>
            {stats.map((stat) => (
              <View key={stat.label} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item, idx) => (
          <TouchableOpacity key={item.label} style={styles.menuItem}>
            <View style={styles.menuIconWrapper}>
              <Feather name={item.icon} size={22} color="#06b6d4" />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <View style={styles.menuRight}>
              {item.badge && (
                <View style={styles.menuBadge}>
                  <Text style={styles.menuBadgeText}>{item.badge}</Text>
                </View>
              )}
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
