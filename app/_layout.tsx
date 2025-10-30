import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { ClerkProvider, useAuth, SignedIn, SignedOut } from '@clerk/clerk-expo';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const clerkPubKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SignedIn>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
        </SignedIn>
        <SignedOut>
          <Stack>
            <Stack.Screen name="auth" options={{ headerShown: false }} />
          </Stack>
        </SignedOut>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ClerkProvider>
  );
}
