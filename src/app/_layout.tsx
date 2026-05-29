// external-imports
import { Stack } from 'expo-router';

// function to render the root layout
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
