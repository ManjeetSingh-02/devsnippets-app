// external-imports
import { useRouter } from 'expo-router';
import { Button, Card, Chip, Separator, Typography } from 'heroui-native';
import { CalendarDays, Heart, Pencil, Share2 } from 'lucide-react-native';
import { Share, View } from 'react-native';
import { useUniwind } from 'uniwind';

// type-imports
import type { StoredSnippet } from '@/types/snippet';

// function to render snippet data
export default function SnippetData({ data }: { data: StoredSnippet }) {
  // get the current theme from uniwind
  const { theme } = useUniwind();
  const iconColor = theme === 'dark' ? 'white' : 'black';

  // get the router instance for navigation
  const router = useRouter();

  return (
    <Card variant="transparent">
      <Card.Body className="gap-y-5 p-4">
        <View className="flex-row items-start justify-between">
          <Typography.Heading type="h2">{data.title}</Typography.Heading>
          <Heart size={24} fill={data.favourite ? 'currentColor' : 'transparent'} />
        </View>

        <View className="gap-y-3">
          <View className="flex-row items-center justify-between">
            <Typography.Heading>Language</Typography.Heading>
            <Chip>{data.language}</Chip>
          </View>

          <View className="flex-row items-center gap-x-2">
            <CalendarDays size={18} />
            <Typography.Paragraph>{data.created_at}</Typography.Paragraph>
          </View>

          {data.tags && (
            <View className="gap-y-2">
              <Typography.Paragraph>Tags</Typography.Paragraph>
              <View className="flex-row flex-wrap gap-2">
                {data.tags
                  .split(',')
                  .map(tag => tag.trim())
                  .filter(Boolean)
                  .map(tag => (
                    <Chip key={tag} size="sm">
                      {tag}
                    </Chip>
                  ))}
              </View>
            </View>
          )}
        </View>

        <Separator />

        <View className="gap-y-2">
          <Typography.Heading type="h4">Code</Typography.Heading>
          <Card variant="tertiary">
            <Card.Body className="p-4">
              <Typography.Code>{data.code}</Typography.Code>
            </Card.Body>
          </Card>
        </View>
      </Card.Body>
      <Card.Footer>
        <View className="flex-row gap-x-3">
          <Button
            variant="outline"
            isIconOnly
            onPress={() => router.push(`/snippets/${data.id}/edit`)}
          >
            <Pencil color={iconColor} />
          </Button>
          <Button
            variant="outline"
            isIconOnly
            onPress={() => Share.share({ title: data.title, message: data.code })}
          >
            <Share2 color={iconColor} />
          </Button>
        </View>
      </Card.Footer>
    </Card>
  );
}
