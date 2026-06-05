// internal-imports
import SafeScreen from '@/components/SafeScreen';
import Appearance from '@/components/Appearance';
import StorageManagement from '@/components/StorageManagement';

// external-imports
import { Typography } from 'heroui-native';
import { ScrollView } from 'react-native';

// function to render the settings screen
export default function Settings() {
  return (
    <SafeScreen>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-6 gap-6"
        showsVerticalScrollIndicator={false}
      >
        <Typography.Heading type="h1">Settings</Typography.Heading>
        <Appearance />
        <StorageManagement />
      </ScrollView>
    </SafeScreen>
  );
}
