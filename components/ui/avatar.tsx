
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

type AvatarProps = {
  source: { uri: string };
  size?: number;
  style?: object;
  fallback?: string;
};

export function Avatar({ source, size = 40, style, fallback }: AvatarProps) {
  return (
    <View style={[styles.avatar, { width: size, height: size }, style]}>
      <Image
        source={source}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        resizeMode="cover"
        onError={() => {}}
      />
      {/* Fallback can be shown if image fails to load */}
      {/* Optionally, you can add initials or a default icon here */}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
