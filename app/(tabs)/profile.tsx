
import React, { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '@/context/UserContext';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';


export default function Profile() {
  const { user, loading, logout, likes, fetchUserLikes } = useUser();
  const [showSaved, setShowSaved] = useState(false);
  const [savedLoading, setSavedLoading] = useState(false);
  const [savedError, setSavedError] = useState<string | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [localName, setLocalName] = useState('');
  const [localImage, setLocalImage] = useState('');
  const [saving, setSaving] = useState(false);

  // Load local profile on mount
  useEffect(() => {
    (async () => {
      const name = await SecureStore.getItemAsync('profile_name');
      const image = await SecureStore.getItemAsync('profile_image');
      if (name) setLocalName(name);
      if (image) setLocalImage(image);
    })();
  }, []);

  // Fetch saved places when modal opens
  const handleShowSaved = async () => {
    if (!user?.clerk_id) return;
    setSavedLoading(true);
    setSavedError(null);
    try {
      await fetchUserLikes(user.clerk_id);
      setShowSaved(true);
    } catch (err: any) {
      setSavedError(err.message || 'Could not load saved places');
    } finally {
      setSavedLoading(false);
    }
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
    
      // --- DARK THEME STYLES ---
      const styles = StyleSheet.create({
        darkContainer: {
          flex: 1,
          backgroundColor: '#18181b',
        },
        profileCard: {
          
          backgroundColor: '#23232a',
          borderRadius: 24,
          margin: 18,
          marginTop: 48,
          paddingVertical: 28,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 4,
        },
        avatarLarge: {
          width: 90,
          height: 90,
          borderRadius: 45,
          borderWidth: 2,
          borderColor: '#fff',
          marginBottom: 12,
        },
        profileName: {
          fontSize: 22,
          fontWeight: 'bold',
          color: '#fff',
          marginBottom: 2,
        },
        profileEmail: {
          fontSize: 15,
          color: '#a1a1aa',
          marginBottom: 10,
        },
        editProfileBtn: {
          backgroundColor: '#fff',
          borderRadius: 16,
          paddingHorizontal: 18,
          paddingVertical: 6,
          marginTop: 8,
        },
        editProfileBtnText: {
          color: '#2563eb',
          fontWeight: 'bold',
          fontSize: 15,
        },
        sectionGroup: {
          marginTop: 18,
          backgroundColor: '#23232a',
          borderRadius: 18,
          marginHorizontal: 18,
          paddingVertical: 8,
          paddingHorizontal: 8,
        },
        sectionHeader: {
          color: '#a1a1aa',
          fontWeight: 'bold',
          fontSize: 13,
          marginLeft: 8,
          marginBottom: 2,
          marginTop: 6,
          letterSpacing: 1,
          textTransform: 'uppercase',
        },
        settingsRow: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 14,
          paddingHorizontal: 8,
          borderRadius: 12,
          marginBottom: 2,
        },
        settingsIcon: {
          fontSize: 20,
          marginRight: 16,
          color: '#fff',
          width: 28,
          textAlign: 'center',
        },
        settingsText: {
          color: '#fff',
          fontSize: 16,
          fontWeight: '500',
        },
        logoutBtn: {
          backgroundColor: '#fff',
          borderRadius: 18,
          marginHorizontal: 18,
          marginTop: 32,
          paddingVertical: 12,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 2,
        },
        logoutBtnText: {
          color: '#ef4444',
          fontWeight: 'bold',
          fontSize: 16,
          letterSpacing: 1,
        },
      });
    }}
  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#f6f8fa', paddingHorizontal: 0 }}>
        <View style={{ alignItems: 'center', marginTop: 36, marginBottom: 18 }}>
          <TouchableOpacity onPress={handlePickImage} style={{ marginBottom: 10 }}>
            <Image
              source={localImage || user?.image_url ? { uri: localImage || user?.image_url } : { uri: 'https://ui-avatars.com/api/?name=User&background=cccccc&color=222222&size=128' }}
              style={{ width: 96, height: 96, borderRadius: 48, borderWidth: 2, borderColor: '#e0e7ef', backgroundColor: '#f0f4f8' }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#222', marginBottom: 2 }}>{localName || user?.name || 'Your Name'}</Text>
          <Text style={{ fontSize: 15, color: '#6b7280', marginBottom: 10 }}>{user?.email || ''}</Text>
          <TouchableOpacity onPress={() => setEditModal(true)} style={{ backgroundColor: '#e0e7ef', borderRadius: 18, paddingHorizontal: 20, paddingVertical: 7, marginTop: 6 }}>
            <Text style={{ color: '#2563eb', fontWeight: 'bold', fontSize: 15 }}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 0, backgroundColor: '#fff', borderRadius: 16, marginHorizontal: 18, paddingVertical: 16, paddingHorizontal: 14, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1 }}>
          <TouchableOpacity onPress={handleShowSaved} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 10, borderRadius: 10, marginBottom: 10, backgroundColor: '#f3f6fa' }}>
            <Text style={{ color: '#2563eb', fontSize: 16, fontWeight: '600' }}>Saved Places</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout} style={{ backgroundColor: '#ffeaea', borderRadius: 14, marginHorizontal: 0, marginTop: 8, paddingVertical: 13, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1 }}>
            <Text style={{ color: '#ef4444', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 }}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={showSaved}
        animationType="slide"
        transparent
        onRequestClose={() => setShowSaved(false)}
      >
        <View style={{ backgroundColor: '#fff', borderRadius: 22, padding: 22, width: '90%', maxHeight: '80%', alignSelf: 'center', marginTop: 60, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 8 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#2563eb' }}>Your Saved Places</Text>
          {savedLoading && <Text>Loading...</Text>}
          {savedError && <Text style={{ color: '#ef4444' }}>{savedError}</Text>}
          {!savedLoading && !savedError && (
            <ScrollView style={{ maxHeight: 350 }}>
              {(!likes || (Object.keys(likes).length === 0)) && (
                <Text style={{ color: '#888', marginVertical: 12 }}>No saved places yet.</Text>
              )}
              {likes && Object.entries(likes).map(([category, items]: any) => (
                <View key={category} style={{ marginBottom: 14 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4, color: '#2563eb' }}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
                  {Array.isArray(items) && items.length > 0 ? (
                    items.map((item: any) => (
                      <View key={item.item_id || item._id || item.name} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 7 }}>
                        {item.image_url && (
                          <Image source={{ uri: item.image_url }} style={{ width: 38, height: 38, borderRadius: 10, marginRight: 10, backgroundColor: '#f3f6fa' }} />
                        )}
                        <Text style={{ fontSize: 16, color: '#222' }}>{item.name || item.title}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={{ color: '#888', marginLeft: 8 }}>No saved {category}.</Text>
                  )}
                </View>
              ))}
            </ScrollView>
          )}
          <TouchableOpacity onPress={() => setShowSaved(false)} style={{ marginTop: 18, alignSelf: 'center', backgroundColor: '#2563eb', borderRadius: 14, paddingHorizontal: 28, paddingVertical: 10 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 17 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}