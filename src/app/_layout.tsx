// internal-imports
import '@/global.css';
import { initializeApp } from '@/utils/initialize-app';

// external-imports
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { HeroUINativeProvider } from 'heroui-native/provider';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// function to render the root layout
export default function RootLayout() {
  // useEffect to perform startup tasks
  useEffect(() => {
    void initializeApp();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider>
        <StatusBar style="auto" animated />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
