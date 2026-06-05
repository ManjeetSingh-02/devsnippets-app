// external-imports
import { Button, Description, SearchField } from 'heroui-native';
import { Heart } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { useUniwind } from 'uniwind';

// function to render the header component
export default function Header() {
  // get the current theme from uniwind
  const { theme } = useUniwind();
  const iconColor = theme === 'dark' ? 'white' : 'black';

  // state to manage the search input value
  const [searchValue, setSearchValue] = useState('');

  return (
    <View className="flex-row gap-x-2">
      <SearchField value={searchValue} onChange={setSearchValue} className="flex-1">
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>Search by title, language, or tags</Description>
      </SearchField>

      <Button variant="outline" isIconOnly>
        <Heart size={24} color={iconColor} />
      </Button>
    </View>
  );
}
