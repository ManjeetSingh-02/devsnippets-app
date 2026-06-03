// internal-imports
import SafeScreen from '@/components/SafeScreen';

// external-imports
import { Text, View } from 'react-native';

// function to render the settings screen
export default function Settings() {
  return (
    <SafeScreen>
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <Text className="text-black dark:text-white">Settings</Text>
      </View>
    </SafeScreen>
  );
}
