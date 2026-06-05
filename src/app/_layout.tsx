// internal-imports
import '@/global.css';
import { initDB } from '@/db/index';

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
    void initDB();
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
