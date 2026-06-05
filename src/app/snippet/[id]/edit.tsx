// internal-imports
import SafeScreen from '@/components/SafeScreen';

// external-imports
import { Typography } from 'heroui-native';
import { ScrollView } from 'react-native';

// function to render the edit screen
export default function Edit() {
  return (
    <SafeScreen>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-6 gap-6"
        showsVerticalScrollIndicator={false}
      >
        <Typography.Heading type="h1">Update Snippet</Typography.Heading>
      </ScrollView>
    </SafeScreen>
  );
}
