// external-imports
import { useRouter } from 'expo-router';
import { Button } from 'heroui-native';
import { Plus } from 'lucide-react-native';
import { useUniwind } from 'uniwind';

export default function FloatingButton() {
  // get the current theme from uniwind
  const { theme } = useUniwind();
  const iconColor = theme === 'dark' ? 'white' : 'black';

  // get the router instance from expo-router
  const router = useRouter();

  // function to handle button press
  function handlePress() {
    // navigate to the create page
    router.push('/snippets/create');
  }

  return (
    <Button
      isIconOnly
      variant="outline"
      className="absolute bottom-4 right-4"
      size="lg"
      onPress={handlePress}
    >
      <Plus size={24} color={iconColor} />
    </Button>
  );
}
