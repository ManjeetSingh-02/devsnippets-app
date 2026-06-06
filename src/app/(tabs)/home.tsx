// internal-imports
import FloatingButton from '@/components/FloatingButton';
import Header from '@/components/Header';
import SafeScreen from '@/components/SafeScreen';
import SnippetList from '@/components/SnippetList';

// external-imports
import { Typography } from 'heroui-native';
import { View } from 'react-native';

// function to render the home screen
export default function Home() {
  return (
    <SafeScreen>
      <View className="flex-1">
        <View className="px-4 py-6 gap-6">
          <Typography.Heading type="h1">Your Snippets</Typography.Heading>
          <Header />
        </View>
        <SnippetList />
      </View>
      <FloatingButton />
    </SafeScreen>
  );
}
