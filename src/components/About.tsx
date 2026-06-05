// external-imports
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import { LinkButton, ListGroup, Separator, Typography } from 'heroui-native';
import { BadgeInfo, User } from 'lucide-react-native';
import { View } from 'react-native';
import { useUniwind } from 'uniwind';

// function to render the about options
export default function About() {
  // get the current theme from uniwind
  const { theme } = useUniwind();
  const iconColor = theme === 'dark' ? 'white' : 'black';

  // function to handle the press action on the developer link
  function handleDeveloperLinkPress() {
    Linking.openURL('https://github.com/ManjeetSingh-02');
  }

  return (
    <View className="gap-y-2">
      <Typography.Heading type="h6">About</Typography.Heading>

      <ListGroup className="w-full">
        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <BadgeInfo size={24} color={iconColor} />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>Version</ListGroup.ItemTitle>
            <ListGroup.ItemDescription>{Constants.expoConfig?.version}</ListGroup.ItemDescription>
          </ListGroup.ItemContent>
        </ListGroup.Item>

        <Separator />

        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <User size={24} color={iconColor} />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>Developer</ListGroup.ItemTitle>
            <ListGroup.ItemDescription>
              <LinkButton>
                <LinkButton.Label className="text-accent-hover" onPress={handleDeveloperLinkPress}>
                  Manjeet Singh
                </LinkButton.Label>
              </LinkButton>
            </ListGroup.ItemDescription>
          </ListGroup.ItemContent>
        </ListGroup.Item>
      </ListGroup>
    </View>
  );
}
