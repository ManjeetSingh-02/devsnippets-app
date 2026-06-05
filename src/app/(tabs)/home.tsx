// internal-imports
import FloatingButton from '@/components/FloatingButton';
import Header from '@/components/Header';
import SafeScreen from '@/components/SafeScreen';

// external-imports
import { Typography } from 'heroui-native';
import { ScrollView } from 'react-native';

// function to render the home screen
export default function Home() {
  return (
    <SafeScreen>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-6 gap-6"
        showsVerticalScrollIndicator={false}
      >
        <Typography.Heading type="h1">Your Snippets</Typography.Heading>
        <Header />
      </ScrollView>
      <FloatingButton />
    </SafeScreen>
  );
}
