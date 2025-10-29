import React, { useRef, useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function Message() {
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
    <View style={styles.container}>
      <Text style={styles.header}>Messages</Text>
      <View style={styles.searchBarRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View style={styles.listContainer}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 8,
    color: '#222',
  },
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    color: '#222',
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
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 2,
  },
  selectedRow: {
    backgroundColor: '#f3f4f6',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
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
    fontSize: 16,
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
