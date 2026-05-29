// external-imports
import { SafeAreaView } from 'react-native-safe-area-context';

// type-imports
import type { ReactNode } from 'react';

// function to wrap screens in a safe area view
export default function SafeScreen({ children }: { children: ReactNode }) {
  return <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>;
}
