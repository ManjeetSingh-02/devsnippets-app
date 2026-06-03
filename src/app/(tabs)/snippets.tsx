// internal-imports
import SafeScreen from '@/components/SafeScreen';

// external-imports
import { Text, View } from 'react-native';

// function to render the snippets screen
export default function Snippets() {
  return (
    <SafeScreen>
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <Text className="text-black dark:text-white">Snippets</Text>
      </View>
    </SafeScreen>
  );
}
