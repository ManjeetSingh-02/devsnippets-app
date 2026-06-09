// external-imports
import { useRouter } from 'expo-router';
import { Card, Chip, PressableFeedback, Typography } from 'heroui-native';
import { Heart } from 'lucide-react-native';
import { FlatList } from 'react-native';
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
        <Card className="flex-1 gap-2 mx-4 mb-4 ">
          <Card.Header className="flex-row justify-between">
            <Chip size="sm" color="default">
              {item.language.toUpperCase()}
            </Chip>
            <Heart size={24} color={iconColor} fill={item.favourite ? iconColor : 'transparent'} />
          </Card.Header>
          <Card.Body>
            <Typography.Paragraph truncate numberOfLines={2} className="text-lg">
              {item.title}
            </Typography.Paragraph>
          </Card.Body>
          <Card.Footer>
            <Typography.Paragraph className="text-sm text-muted">
              {new Date(item.created_at).toLocaleString()}
            </Typography.Paragraph>
          </Card.Footer>
        </Card>
      </PressableFeedback>
    );
  }

  // function to render the empty component when there are no snippets
  function renderEmptyComponent() {
    return (
      <Typography type="h4" className="text-center mt-10">
        Create new snippet by clicking the + button below
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
