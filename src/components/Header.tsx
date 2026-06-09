// external-imports
import { Button, Description, SearchField } from 'heroui-native';
import { Heart } from 'lucide-react-native';
import { View } from 'react-native';
import { useUniwind } from 'uniwind';

// type for the header component props
type HeaderProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  favouritesOnly: boolean;
  onFavouriteToggle: () => void;
};

// function to render the header component
export default function Header({
  favouritesOnly,
  onFavouriteToggle,
  onSearchChange,
  searchValue,
}: HeaderProps) {
  // get the current theme from uniwind
  const { theme } = useUniwind();
  const iconColor = theme === 'dark' ? 'white' : 'black';

  return (
    <View className="flex-row gap-x-2">
      <SearchField value={searchValue} onChange={onSearchChange} className="flex-1">
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input placeholder="Search snippets..." />
          <SearchField.ClearButton variant="ghost" />
        </SearchField.Group>
        <Description>Search by title or language</Description>
      </SearchField>

      <Button variant="outline" isIconOnly onPress={onFavouriteToggle}>
        <Heart size={24} color={iconColor} fill={favouritesOnly ? iconColor : 'transparent'} />
      </Button>
    </View>
  );
}
