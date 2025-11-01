import React, { useRef, useEffect } from 'react';
import { Image } from 'expo-image';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function Profile() {
  // Animation refs
  const headerAnim = useRef(new Animated.Value(-60)).current;
  const headerFade = useRef(new Animated.Value(0)).current;
  const avatarAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerAnim, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(headerFade, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(avatarAnim, {
        toValue: 1,
        duration: 500,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(cardAnim, {
        toValue: 1,
        duration: 600,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [headerAnim, headerFade, avatarAnim, cardAnim]);

  const user = {
    name: 'Sarah Anderson',
    email: 'sarah.anderson@email.com',
    location: 'New York, USA',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    superhost: true,
  };
  const quickActions = [
    {}, {}, {}
  ];
  const settings = [
    { icon: '⚙️', label: 'Account Settings', badge: null },
    { icon: '🤍', label: 'Saved', badge: 12 },
    { icon: '📅', label: 'Bookings', badge: 3 },
    { icon: '🏠', label: 'My Listings', badge: null },
    { icon: '💳', label: 'Payment Methods', badge: null },
    { icon: '❓', label: 'Help Center', badge: null },
    { icon: '🚪', label: 'Logout', badge: null, danger: true },
  ];
  const activities = [
    { image: 'https://images.unsplash.com/photo-1601019404210-8bb5dd3ab015?auto=format&fit=crop&w=400&q=80', label: 'Booked Beach House in Malibu', time: '2 days ago' },
    { image: 'https://images.unsplash.com/photo-1623015522585-ddc7e066a821?auto=format&fit=crop&w=400&q=80', label: 'Reviewed Mountain Cabin', time: '1 week ago' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Animated Gradient Header */}
      <Animated.View
        style={[
          styles.animatedHeader,
          {
            transform: [{ translateY: headerAnim }],
            opacity: headerFade,
          },
        ]}
      >
        <LinearGradient colors={["#6a85f1", "#38bdf8"]} start={{x:0.1,y:0}} end={{x:1,y:0.8}} style={styles.headerBg}>
          <Animated.View style={[styles.profileHeader, { opacity: avatarAnim, transform: [{ scale: avatarAnim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }] }] }>
            <View style={styles.avatarWrap}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              {user.superhost && (
                <View style={styles.superhostStar}><Text style={{ color: '#fff', fontSize: 16 }}>★</Text></View>
              )}
            </View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.location}>{user.location}</Text>
            </View>
            <View style={styles.superhostBadge}><Text style={styles.superhostText}>Superhost</Text></View>
          </Animated.View>
          <View style={styles.quickActionsRow}>
            {quickActions.map((_, idx) => (
              <View key={idx} style={styles.quickActionCard} />
            ))}
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Animated Settings List */}
      <Animated.View style={[styles.settingsList, { opacity: cardAnim, transform: [{ translateY: cardAnim.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }] }] }>
        {settings.map((item, idx) => (
          <TouchableOpacity key={item.label} style={[styles.settingsItem, item.danger && styles.dangerItem]}>
            <View style={styles.settingsIcon}><Text style={{ fontSize: 20 }}>{item.icon}</Text></View>
            <Text style={[styles.settingsLabel, item.danger && { color: '#ef4444' }]}>{item.label}</Text>
            {item.badge && (
              <View style={styles.settingsBadge}><Text style={styles.settingsBadgeText}>{item.badge}</Text></View>
            )}
            <Text style={styles.settingsArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

      {/* Animated Recent Activity */}
      <Animated.View style={[styles.activitySection, { opacity: cardAnim, transform: [{ translateY: cardAnim.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }] }] }>
        <Text style={styles.activityHeader}>Recent Activity</Text>
        {activities.map((act, idx) => (
          <TouchableOpacity key={idx} style={styles.activityCard}>
            <Image source={{ uri: act.image }} style={styles.activityImage} />
            <View style={styles.activityInfo}>
              <Text style={styles.activityLabel}>{act.label}</Text>
              <Text style={styles.activityTime}>{act.time}</Text>
            </View>
            <Text style={styles.activityArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  animatedHeader: {
    zIndex: 2,
  },
  headerBg: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 12,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  superhostStar: {
    position: 'absolute',
    bottom: 0,
    right: -8,
    backgroundColor: '#facc15',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  email: {
    fontSize: 15,
    color: '#e0f2fe',
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 2,
    color: '#fff',
  },
  location: {
    fontSize: 15,
    color: '#fff',
  },
  superhostBadge: {
    backgroundColor: '#2dd4bf',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 4,
  },
  superhostText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  quickActionCard: {
    width: 64,
    height: 64,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsList: {
    marginTop: 12,
    paddingHorizontal: 12,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  dangerItem: {
    backgroundColor: '#fef2f2',
  },
  settingsIcon: {
    marginRight: 12,
  },
  settingsLabel: {
    fontSize: 16,
    color: '#222',
    flex: 1,
    fontWeight: '500',
  },
  settingsBadge: {
    backgroundColor: '#2dd4bf',
    borderRadius: 10,
    minWidth: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  settingsBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  settingsArrow: {
    fontSize: 20,
    color: '#94a3b8',
    marginLeft: 8,
  },
  activitySection: {
    marginTop: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  activityHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  activityImage: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityLabel: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  activityArrow: {
    fontSize: 20,
    color: '#94a3b8',
    marginLeft: 8,
  },
});
