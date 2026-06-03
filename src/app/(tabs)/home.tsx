// internal-imports
import SafeScreen from '@/components/SafeScreen';

// external-imports
import { Typography } from 'heroui-native';
import { View } from 'react-native';

// function to render the home screen
export default function Home() {
  return (
    <SafeScreen>
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <Typography>Home</Typography>
      </View>
    </SafeScreen>
  );
}
