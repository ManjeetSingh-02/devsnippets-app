// external-imports
import { useRouter } from 'expo-router';
import { Card, Chip, PressableFeedback, Typography } from 'heroui-native';
import { Heart } from 'lucide-react-native';
import { FlatList, View } from 'react-native';
import { useUniwind } from 'uniwind';

// type-imports
import { SnippetPreview } from '@/types/snippet';

// function component for the snippet list
export default function SnippetList({ data }: { data: SnippetPreview[] }) {
  // get the current theme from uniwind
  const { theme } = useUniwind();
  const iconColor = theme === 'dark' ? 'white' : 'black';

  // get the router instance for navigation
  const router = useRouter();

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

  return (
    <FlatList
      data={data}
      keyExtractor={item => String(item.id)}
      renderItem={renderItemComponent}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
}
