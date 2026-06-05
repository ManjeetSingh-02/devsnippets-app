// internal-imports
import { deleteAllSnippets } from '@/db';

// external-imports
import { Button, ListGroup, Separator, Spinner, Typography, useToast } from 'heroui-native';
import {
  Box,
  CheckCircle2,
  CircleX,
  FileBox,
  FileCodeCorner,
  FileHeart,
} from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { useUniwind } from 'uniwind';

// function to render the storage management options
export default function StorageManagement() {
  // get the current theme from uniwind
  const { theme } = useUniwind();
  const iconColor = theme === 'dark' ? 'white' : 'black';

  // state to track if the snippets are being deleted
  const [isDeleting, setIsDeleting] = useState(false);

  // get the toast function from heroui
  const { toast } = useToast();

  // function to handle the deletion of all snippets
  async function handleSnippetsDelete() {
    try {
      // set the deleting state to true
      setIsDeleting(true);

      // delete all snippets from the database
      await deleteAllSnippets();

      // show a success toast message
      toast.show({
        variant: 'success',
        label: 'Snippets Deleted',
        description: 'All the snippets have been successfully deleted.',
        icon: <CheckCircle2 size={24} color="green" />,
        isSwipeable: true,
      });
    } catch {
      toast.show({
        variant: 'danger',
        label: 'Deletion Failed',
        description: 'Something went wrong while deleting the snippets.',
        icon: <CircleX size={24} color="red" />,
        isSwipeable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <View className="gap-y-2">
      <Typography.Heading type="h6">Storage Management</Typography.Heading>

      <ListGroup className="w-full">
        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <Box size={24} color={iconColor} />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>Storage Type</ListGroup.ItemTitle>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix>
            <Typography.Paragraph>Local</Typography.Paragraph>
          </ListGroup.ItemSuffix>
        </ListGroup.Item>

        <Separator />

        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <FileBox size={24} color={iconColor} />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>Storage Used</ListGroup.ItemTitle>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix>
            <Typography.Paragraph>1.4 MB</Typography.Paragraph>
          </ListGroup.ItemSuffix>
        </ListGroup.Item>

        <Separator />

        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <FileCodeCorner size={24} color={iconColor} />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>Total Snippets</ListGroup.ItemTitle>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix>
            <Typography.Paragraph>128</Typography.Paragraph>
          </ListGroup.ItemSuffix>
        </ListGroup.Item>

        <Separator />

        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <FileHeart size={24} color={iconColor} />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>Favourite Snippets</ListGroup.ItemTitle>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix>
            <Typography.Paragraph>12</Typography.Paragraph>
          </ListGroup.ItemSuffix>
        </ListGroup.Item>
      </ListGroup>

      <Button
        variant="danger-soft"
        className="w-full"
        onPress={handleSnippetsDelete}
        isDisabled={isDeleting}
      >
        {isDeleting ? <Spinner size="md" color="red" /> : 'Delete All Snippets'}
      </Button>
    </View>
  );
}
