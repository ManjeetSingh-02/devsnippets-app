// external-imports
import { useRouter } from 'expo-router';
import { Button, Card, Chip, Separator, Typography } from 'heroui-native';
import { Heart, Pencil, Share2 } from 'lucide-react-native';
import { Share, View } from 'react-native';
import { useUniwind } from 'uniwind';

// type-imports
import type { StoredSnippet } from '@/types/snippet';

// function to render snippet data
export default function SnippetData({ data }: { data: StoredSnippet }) {
  // get the current theme from uniwind
  const { theme } = useUniwind();
  const iconColor = theme === 'dark' ? 'white' : 'black';

  const tags = data.tags ? data.tags.split(',').map(tag => tag.trim()) : [];

  // get the router instance for navigation
  const router = useRouter();

  return (
    <Card variant="transparent">
      <Card.Body className="gap-y-5 p-4">
        <View className="gap-y-3">
          <View className="flex-row items-start justify-between">
            <Typography.Heading type="h2">{data.title}</Typography.Heading>
            <Heart size={22} fill={data.favourite ? iconColor : 'transparent'} color={iconColor} />
          </View>

          <View className="flex-row justify-between items-center">
            <Chip size="sm" variant="soft" color="default">
              {data.language.toUpperCase()}
            </Chip>
            <Typography.Paragraph className="text-sm">
              {new Date(data.created_at).toLocaleString()}
            </Typography.Paragraph>
          </View>

          {data.tags && (
            <View className="flex-row flex-wrap gap-2">
              {tags.map(tag => (
                <Chip key={tag} size="sm" variant="soft" color="default">
                  {tag}
                </Chip>
              ))}
            </View>
          )}
        </View>

        <Separator />

        <Card variant="tertiary">
          <Typography.Code>{data.code}</Typography.Code>
        </Card>
      </Card.Body>

      <Card.Footer>
        <View className="flex-row justify-center gap-x-4">
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
