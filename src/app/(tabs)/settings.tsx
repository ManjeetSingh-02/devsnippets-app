// internal-imports
import SafeScreen from '@/components/SafeScreen';
import Appearance from '@/components/Appearance';
import StorageManagement from '@/components/StorageManagement';

// external-imports
import { Typography } from 'heroui-native';
import { View } from 'react-native';

// function to render the settings screen
export default function Settings() {
  return (
    <SafeScreen>
      <View className="flex-1">
        <View className="px-5 pt-8 pb-6">
          <Typography.Heading type="h1">Settings</Typography.Heading>
          <Typography.Paragraph>Customize your snippet manager</Typography.Paragraph>
        </View>

        <View className="px-4 gap-6">
          <Appearance />
          <StorageManagement />
        </View>
      </View>
    </SafeScreen>
  );
}
