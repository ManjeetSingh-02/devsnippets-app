// internal-imports
import SafeScreen from '@/components/SafeScreen';
import SnippetForm from '@/components/SnippetForm';
import { getSnippet, updateSnippet } from '@/db';

// external-imports
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Spinner, Typography, useToast } from 'heroui-native';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { CircleAlert } from 'lucide-react-native';
import { useUniwind } from 'uniwind';

// type-imports
import type { Snippet, StoredSnippet } from '@/types/snippet';

// function to render the edit screen
export default function Edit() {
  // get the current theme from uniwind
  const { theme } = useUniwind();
  const iconColor = theme === 'dark' ? 'white' : 'black';

  // get the id from the route params
  const { id } = useLocalSearchParams();

  // get the router instance from useRouter
  const router = useRouter();

  // get the toast function from heroui
  const { toast } = useToast();

  // state to manage data and UI
  const [snippetData, setSnippetData] = useState<StoredSnippet | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // function to handle form submission
  async function handleSubmit(data: Snippet) {
    try {
      // set updating state to true
      setIsUpdating(true);

      // update the snippet in the database
      await updateSnippet({ data, id: Number(id) });

      // navigate to the snippet details screen
      router.replace({
        pathname: '/snippets/[id]',
        params: { id: Number(id) },
      });
    } catch (error) {
      // log the error
      console.error(error);

      // show an error toast message
      toast.show({
        variant: 'danger',
        label: 'Error',
        description: 'Failed to update snippet.',
        icon: <CircleAlert size={24} color="red" />,
        isSwipeable: true,
      });
    } finally {
      // set updating state to false
      setIsUpdating(false);
    }
  }

  // useEffect to fetch the snippet data when the component mounts
  useEffect(() => {
    // function to fetch the snippet data
    async function fetchSnippet() {
      try {
        // fetch the snippet data from the database
        const data = await getSnippet(Number(id));

        // if no data is found, navigate back to the previous screen
        if (!data) return router.back();

        // set the snippet data in state
        setSnippetData(data);
      } catch (error) {
        // log the error
        console.error(error);

        // show an error toast message
        toast.show({
          variant: 'danger',
          label: 'Error',
          description: 'Failed to load snippet.',
          icon: <CircleAlert size={24} color="red" />,
          isSwipeable: true,
        });
      } finally {
        // set loading state to false
        setIsLoading(false);
      }
    }

    // call the fetchSnippet function
    fetchSnippet();
  }, [id, router, toast]);

  return (
    <SafeScreen>
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <Spinner size="lg" color={iconColor} />
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-4 py-6 gap-6"
          showsVerticalScrollIndicator={false}
        >
          <Typography.Heading type="h1">Update Snippet</Typography.Heading>
          {snippetData && (
            <SnippetForm
              initialData={snippetData}
              onSubmit={handleSubmit}
              isSubmitting={isUpdating}
            />
          )}
        </ScrollView>
      )}
    </SafeScreen>
  );
}
