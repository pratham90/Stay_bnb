
import React, { useRef, useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Animated, Easing } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// ...existing code...


export default function Message() {
  const insets = useSafeAreaInsets();
  // Animation refs
  const headerSlideAnim = useRef(new Animated.Value(-60)).current;
  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const listFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerSlideAnim, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(headerFadeAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(listFadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, [headerSlideAnim, headerFadeAnim, listFadeAnim]);

  const messages = [
    {
      id: 1,
      name: 'Sarah Anderson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      lastMessage: 'The apartment looks amazing! When can I visit?',
      time: '2m ago',
      unread: 2,
      online: true,
      selected: true,
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      lastMessage: 'Thanks for the quick response!',
      time: '1h ago',
      unread: 0,
      online: true,
      selected: false,
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      lastMessage: 'Is parking included?',
      time: '3h ago',
      unread: 1,
      online: false,
      selected: false,
    },
    {
      id: 4,
      name: 'David Martinez',
      avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
      lastMessage: 'Perfect, see you tomorrow!',
      time: 'Yesterday',
      unread: 0,
      online: false,
      selected: false,
    },
  ];

  const [search, setSearch] = useState('');
  const anims = useRef(messages.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(100, anims.map(anim =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      })
    )).start();
  }, [anims]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Elegant Header */}
        <View style={{ paddingTop: insets.top || 16, paddingHorizontal: 18, paddingBottom: 8 }}>
    <Text style={styles.msgHeaderTitle}>Messages</Text>
        </View>
      {/* Search Bar */}
      <View style={styles.searchBarRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {/* Animated Message List */}
      <Animated.View style={[styles.listContainer, { opacity: listFadeAnim }]}> 
        {messages.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.lastMessage.toLowerCase().includes(search.toLowerCase())).map((msg, idx) => (
          <Animated.View
            key={msg.id}
            style={{
              opacity: anims[idx],
              transform: [{ translateY: anims[idx].interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }],
            }}
          >
            <TouchableOpacity style={[styles.messageRow, msg.selected && styles.selectedRow]}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: msg.avatar }} style={styles.avatar} />
                {msg.online && <View style={styles.onlineDot} />}
              </View>
              <View style={styles.messageInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{msg.name}</Text>
                  <Text style={styles.time}>{msg.time}</Text>
                </View>
                <Text style={styles.lastMessage} numberOfLines={1}>{msg.lastMessage}</Text>
              </View>
              {msg.unread > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{msg.unread}</Text>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        ))}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  headerShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 2,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    backgroundColor: 'transparent',
    marginBottom: 2,
  },
  msgHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    minHeight: 74,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  msgHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgHeaderTitle: {
    fontWeight: '600',
    fontSize: 25,
    color: '#000000ff',
    letterSpacing: 0.2,
    marginLeft: 2,
    textShadowColor: 'rgba(0,0,0,0.10)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  msgHeaderBtn: {
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderRadius: 16,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.13)',
  },
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
    marginTop: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: '#222',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 15,
    marginTop: 15,
  },
  listContainer: {
    flex: 1,
    marginTop: 4,
    paddingHorizontal: 8,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedRow: {
    backgroundColor: '#e0e7ef',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#fff',
  },
  messageInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#222',
  },
  time: {
    fontSize: 13,
    color: '#888',
    marginLeft: 8,
  },
  lastMessage: {
    fontSize: 15,
    color: '#444',
    marginTop: 2,
  },
  unreadBadge: {
    backgroundColor: '#2dd4bf',
    borderRadius: 10,
    minWidth: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  unreadText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
