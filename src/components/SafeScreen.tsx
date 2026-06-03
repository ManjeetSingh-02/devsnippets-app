// external-imports
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// type-imports
import type { ReactNode } from 'react';

// function to wrap screens in a safe area view
export default function SafeScreen({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
      }}
    >
      {children}
    </SafeAreaView>
  );
}
