// internal-imports
import SafeScreen from '@/components/SafeScreen';
import SnippetForm from '@/components/SnippetForm';
import { createSnippet } from '@/db';

// external-imports
import { useRouter } from 'expo-router';
import { Typography, useToast } from 'heroui-native';
import { ScrollView } from 'react-native';
import { CircleAlert } from 'lucide-react-native';

// type-imports
import type { Snippet } from '@/types/snippet';

// function to render the create screen
export default function Create() {
  // get the router instance from useRouter
  const router = useRouter();

  // get the toast function from heroui
  const { toast } = useToast();

  // function to handle form submission
  async function handleSubmit(data: Snippet) {
    try {
      // create the snippet in the database
      const id = await createSnippet(data);

      // navigate to the snippet details screen
      router.replace({
        pathname: '/snippet/[id]',
        params: { id },
      });
    } catch (error) {
      // log the error
      console.error(error);

      // show an error toast message
      toast.show({
        variant: 'danger',
        label: 'Error',
        description: 'Failed to create snippet.',
        icon: <CircleAlert size={24} color="red" />,
        isSwipeable: true,
      });
    }
  }

  return (
    <SafeScreen>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-6 gap-6"
        showsVerticalScrollIndicator={false}
      >
        <Typography.Heading type="h1">Create Snippet</Typography.Heading>
        <SnippetForm onSubmit={handleSubmit} />
      </ScrollView>
    </SafeScreen>
  );
}
