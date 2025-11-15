
import { useColorScheme } from '@/hooks/use-color-scheme';
import { UserProvider, useUser } from '@/context/UserContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';

  const colorScheme = useColorScheme();
  const clerkPubKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout() {
  // Clerk session persistence for Expo
  const tokenCache = {
    getToken: SecureStore.getItemAsync,
    saveToken: SecureStore.setItemAsync,
  };

  return (
    <ClerkProvider publishableKey={clerkPubKey} tokenCache={tokenCache}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <UserProvider>
          <ConditionalTabs />
        </UserProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ClerkProvider>
  );
}

function ConditionalTabs() {
  const { isLoggedIn } = useUser();
  if (isLoggedIn) {
    return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
    );
  } else {
    return (
      <Stack>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack>
    );
  }
}
