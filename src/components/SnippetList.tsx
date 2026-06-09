// internal-imports
import { getAllSnippets } from '@/db';
import { SnippetPreview } from '@/types/snippet';

// external-imports
import { useFocusEffect, useRouter } from 'expo-router';
import { Card, Chip, PressableFeedback, Spinner, Typography } from 'heroui-native';
import { Heart } from 'lucide-react-native';
import { useState, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { useUniwind } from 'uniwind';

// function component for the snippet list
export default function SnippetList() {
  // get the current theme from uniwind
  const { theme } = useUniwind();
  const iconColor = theme === 'dark' ? 'white' : 'black';

  // get the router instance for navigation
  const router = useRouter();

  // state for the data and UI
  const [snippetsData, setSnippetsData] = useState<SnippetPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // function to render each item in the snippet list
  function renderItemComponent({ item }: { item: SnippetPreview }) {
    return (
      <PressableFeedback onPress={() => router.push(`/snippets/${item.id}`)}>
        <Card className="mx-3 mb-3">
          <Card.Header>
            <Chip size="md" variant="tertiary" color="default">
              {item.language.toUpperCase()}
            </Chip>
          </Card.Header>
          <Card.Body className="gap-y-4 p-4">
            <View className="flex-row items-start justify-between">
              <Card.Title>{item.title}</Card.Title>
              <Heart
                size={20}
                color={iconColor}
                fill={item.favourite ? iconColor : 'transparent'}
              />
            </View>
          </Card.Body>
          <Card.Footer className="flex-row items-center gap-2">
            {item.tags
              ?.split(',')
              .map(tag => tag.trim())
              .filter(Boolean)
              .map((tag, i) => (
                <Chip variant="secondary" color="default" key={i} size="sm">
                  {tag}
                </Chip>
              ))}
          </Card.Footer>
        </Card>
      </PressableFeedback>
    );
  }

  // function to render the empty component when there are no snippets
  function renderEmptyComponent() {
    return (
      <Typography type="h4" className="text-center mt-10">
        Create your first snippet from the + button.
      </Typography>
    );
  }

  // function to fetch all snippets from the database
  async function fetchSnippet() {
    try {
      // fetch the snippets data from the database
      const data = await getAllSnippets();

      // set the snippets data in state
      setSnippetsData(data);
    } catch (error) {
      // log the error
      console.error(error);

      // set error state to true
      setError(true);
    } finally {
      // set loading state to false
      setIsLoading(false);
    }
  }

  // fetch snippets when the component is focused
  useFocusEffect(
    useCallback(() => {
      void fetchSnippet();
    }, [])
  );

  return isLoading ? (
    <Spinner size="lg" color={iconColor} className="mt-10 self-center" />
  ) : error ? (
    <Typography type="h4" className="text-center mt-10">
      Failed to load snippets.
    </Typography>
  ) : (
    <FlatList
      data={snippetsData}
      keyExtractor={item => String(item.id)}
      renderItem={renderItemComponent}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
}
