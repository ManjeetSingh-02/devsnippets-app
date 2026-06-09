// internal-imports
import SafeScreen from '@/components/SafeScreen';
import SnippetData from '@/components/SnippetData';
import { getSnippet } from '@/db';

// external-imports
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Spinner, useToast } from 'heroui-native';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { CircleAlert } from 'lucide-react-native';
import { useUniwind } from 'uniwind';

// type-imports
import type { StoredSnippet } from '@/types/snippet';

// function to render the snippet screen
export default function Snippet() {
  // get the current theme from uniwind
  const { theme } = useUniwind();
  const iconColor = theme === 'dark' ? 'white' : 'black';

  // get the id from the route params
  const { id } = useLocalSearchParams<{ id: string }>();
  const snippetID = Number(id);

  // get the router instance from useRouter
  const router = useRouter();

  // get the toast function from heroui
  const { toast } = useToast();

  // state to manage data and UI
  const [snippetData, setSnippetData] = useState<StoredSnippet | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect to fetch the snippet data when the component mounts
  useEffect(() => {
    // function to fetch the snippet data
    async function fetchSnippet() {
      try {
        // fetch the snippet data from the database
        const data = await getSnippet(snippetID);

        // if no data is found, show an error toast and navigate back to the home screen
        if (!data) {
          // show an error toast message
          toast.show({
            variant: 'danger',
            label: 'Error',
            description: 'Snippet not found.',
            icon: <CircleAlert size={24} color="red" />,
            isSwipeable: true,
          });

          // navigate back to the home screen
          router.replace('/(tabs)/home');
          return;
        }

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
  }, [snippetID, router, toast]);

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
          {snippetData && <SnippetData data={snippetData} />}
        </ScrollView>
      )}
    </SafeScreen>
  );
}
