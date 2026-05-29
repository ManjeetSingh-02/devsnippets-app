// internal-imports
import { initDB } from '@/db/index';

// external-imports
import { Stack } from 'expo-router';
import { useEffect } from 'react';

// function to render the root layout
export default function RootLayout() {
  // useEffect to perform startup tasks
  useEffect(() => {
    initDB();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
