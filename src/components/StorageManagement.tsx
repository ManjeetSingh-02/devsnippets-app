// internal-imports
import { deleteAllSnippets, getSnippetsData } from '@/db';
import { formatBytes } from '@/utils/format-bytes';

// external-imports
import { useFocusEffect } from 'expo-router';
import { Button, Dialog, ListGroup, Separator, Spinner, Typography, useToast } from 'heroui-native';
import {
  Box,
  CheckCircle2,
  CircleAlert,
  FileBox,
  FileCodeCorner,
  FileHeart,
} from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useUniwind } from 'uniwind';

// type for the snippets data
type SnippetsData = {
  totalSnippets: number;
  favouriteSnippets: number;
  storageUsed: number;
};

// function to render the storage management options
export default function StorageManagement() {
  // get the current theme from uniwind
  const { theme } = useUniwind();
  const iconColor = theme === 'dark' ? 'white' : 'black';

  // states to manage data and UI
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);
  const [snippetsData, setSnippetsData] = useState<SnippetsData>({
    totalSnippets: 0,
    favouriteSnippets: 0,
    storageUsed: 0,
  });

  // get the toast function from heroui
  const { toast } = useToast();

  // function to update the snippets count and storage used
  async function updateSnippetsData() {
    try {
      // set the error state to null before fetching data
      setError(false);

      // set the fetching state to true
      setIsFetching(true);

      // fetch the snippets data from the database
      const data = await getSnippetsData();

      // update the snippets data state with the fetched data
      setSnippetsData(data);
    } catch (error) {
      // log the error
      console.error(error);

      // set the error state to true
      setError(true);
    } finally {
      // reset the fetching state
      setIsFetching(false);
    }
  }

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

      // update the snippets data to reflect the changes
      await updateSnippetsData();

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
        icon: <CircleAlert size={24} color="red" />,
        isSwipeable: true,
      });
    } finally {
      // reset the deleting state
      setIsDeleting(false);
    }
  }

  // fetch the snippets count and storage used when the component mounts
  useFocusEffect(
    useCallback(() => {
      void updateSnippetsData();
    }, [])
  );

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
            <ListGroup.ItemDescription>Local</ListGroup.ItemDescription>
          </ListGroup.ItemContent>
        </ListGroup.Item>

        <Separator />

        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <FileBox size={24} color={iconColor} />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>Storage Used</ListGroup.ItemTitle>
            <ListGroup.ItemDescription>
              {isFetching ? (
                <Spinner size="sm" color={iconColor} />
              ) : error ? (
                'Unavailable'
              ) : (
                formatBytes(snippetsData.storageUsed)
              )}
            </ListGroup.ItemDescription>
          </ListGroup.ItemContent>
        </ListGroup.Item>

        <Separator />

        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <FileCodeCorner size={24} color={iconColor} />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>Total Snippets</ListGroup.ItemTitle>
            <ListGroup.ItemDescription>
              {isFetching ? (
                <Spinner size="sm" color={iconColor} />
              ) : error ? (
                'Unavailable'
              ) : (
                snippetsData.totalSnippets
              )}
            </ListGroup.ItemDescription>
          </ListGroup.ItemContent>
        </ListGroup.Item>

        <Separator />

        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <FileHeart size={24} color={iconColor} />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>Favourite Snippets</ListGroup.ItemTitle>
            <ListGroup.ItemDescription>
              {isFetching ? (
                <Spinner size="sm" color={iconColor} />
              ) : error ? (
                'Unavailable'
              ) : (
                snippetsData.favouriteSnippets
              )}
            </ListGroup.ItemDescription>
          </ListGroup.ItemContent>
        </ListGroup.Item>
      </ListGroup>

      <Dialog isOpen={isOpen} onOpenChange={handleOpenChange}>
        <Dialog.Trigger asChild>
          <Button variant="danger-soft" className="w-full" isDisabled={isDeleting || isFetching}>
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
