// internal-imports
import { deleteAllSnippets } from '@/db';

// external-imports
import { Button, Dialog, ListGroup, Separator, Spinner, Typography, useToast } from 'heroui-native';
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

  // state to control the visibility of the delete confirmation dialog
  const [isOpen, setIsOpen] = useState(false);

  // state to track if the deletion process is ongoing
  const [isDeleting, setIsDeleting] = useState(false);

  // get the toast function from heroui
  const { toast } = useToast();

  // function to handle the open change of the dialog
  function handleOpenChange(open: boolean) {
    // prevent opening the dialog if deletion is in progress
    if (isDeleting) return;

    // update the open state of the dialog
    setIsOpen(open);
  }

  // function to handle the close action
  function handleClose() {
    setIsOpen(false);
  }

  // function to handle the delete action
  async function handleDelete() {
    try {
      // set the deleting state to true
      setIsDeleting(true);

      // delete all snippets from the database
      await deleteAllSnippets();

      // close the confirmation dialog
      setIsOpen(false);

      // show a success toast message
      toast.show({
        variant: 'success',
        label: 'Snippets Deleted',
        description: 'All the snippets have been successfully deleted.',
        icon: <CheckCircle2 size={24} color="green" />,
        isSwipeable: true,
      });
    } catch (error) {
      // log the error
      console.error(error);

      // show an error toast message
      toast.show({
        variant: 'danger',
        label: 'Deletion Failed',
        description: 'Something went wrong while deleting the snippets.',
        icon: <CircleX size={24} color="red" />,
        isSwipeable: true,
      });
    } finally {
      // reset the deleting state
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

      <Dialog isOpen={isOpen} onOpenChange={handleOpenChange}>
        <Dialog.Trigger asChild>
          <Button variant="danger-soft" className="w-full" isDisabled={isDeleting}>
            Delete All Snippets
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>Delete All Snippets</Dialog.Title>
            <Dialog.Description>
              Are you sure you want to delete all snippets? This action cannot be undone.
            </Dialog.Description>

            <View className="mt-4 flex-row gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onPress={handleClose}
                isDisabled={isDeleting}
              >
                Cancel
              </Button>

              <Button
                variant="danger-soft"
                className="flex-1"
                onPress={handleDelete}
                isDisabled={isDeleting}
              >
                {isDeleting ? <Spinner size="md" color="danger" /> : 'Delete'}
              </Button>
            </View>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </View>
  );
}
