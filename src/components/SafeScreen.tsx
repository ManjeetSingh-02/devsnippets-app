// external-imports
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUniwind } from 'uniwind';

// type-imports
import type { ReactNode } from 'react';

// function to wrap screens in a safe area view
export default function SafeScreen({ children }: { children: ReactNode }) {
  // get the current theme from uniwind
  const { theme } = useUniwind();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme === 'dark' ? 'black' : 'white',
      }}
    >
      {children}
    </SafeAreaView>
  );
}
