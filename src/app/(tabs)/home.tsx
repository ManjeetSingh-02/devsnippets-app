// internal-imports
import { getAllSnippets } from '@/db';

// internal-imports
import FloatingButton from '@/components/FloatingButton';
import Header from '@/components/Header';
import SafeScreen from '@/components/SafeScreen';
import SnippetList from '@/components/SnippetList';

// external-imports
import { useFocusEffect } from 'expo-router';
import { Spinner, Typography } from 'heroui-native';
import { useState, useCallback } from 'react';
import { View } from 'react-native';
import { useUniwind } from 'uniwind';

// types-import
import { SnippetPreview } from '@/types/snippet';

// function to render the home screen
export default function Home() {
  // get the current theme from uniwind
  const { theme } = useUniwind();
  const iconColor = theme === 'dark' ? 'white' : 'black';

  // state for the data and UI
  const [snippetsData, setSnippetsData] = useState<SnippetPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [favouritesOnly, setFavouritesOnly] = useState(false);

  // filter the snippets data based on the query and favourites
  const filteredSnippets = snippetsData.filter(snippet => {
    const query = searchValue.trim().toLowerCase();

    const matchesSearch =
      query.length === 0 ||
      snippet.title.toLowerCase().includes(query) ||
      snippet.language.toLowerCase().includes(query);

    const matchesFavourite = !favouritesOnly || snippet.favourite;

    return matchesSearch && matchesFavourite;
  });

  // function to fetch all snippets from the database
  async function fetchSnippets() {
    try {
      // set loading state to true
      setIsLoading(true);

      // set error state to false
      setError(false);

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
      void fetchSnippets();
    }, [])
  );

  return (
    <SafeScreen>
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <Spinner size="lg" color={iconColor} />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center">
          <Typography type="h4" className="text-center mt-10">
            Failed to load snippets.
          </Typography>
        </View>
      ) : (
        <View className="flex-1">
          <View className="px-4 py-6 gap-6">
            <Typography.Heading type="h1">Your Snippets</Typography.Heading>
            <Header
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              favouritesOnly={favouritesOnly}
              onFavouriteToggle={() => setFavouritesOnly(prev => !prev)}
            />
          </View>
          <SnippetList data={filteredSnippets} />
          <FloatingButton />
        </View>
      )}
    </SafeScreen>
  );
}
