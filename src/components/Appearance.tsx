// internal-imports
import { THEME_KEY } from '@/constants/storage-keys';

// external-imports
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BottomSheet,
  ListGroup,
  PressableFeedback,
  RadioGroup,
  Separator,
  Typography,
  useToast,
} from 'heroui-native';
import { ChevronRight, CircleAlert, SunMoon } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Uniwind, useUniwind } from 'uniwind';

// type-imports
import type { Theme } from '@/types/theme';

// function to render the appearance options
export default function Appearance() {
  // state to manage the bottom sheet open state
  const [isOpen, setIsOpen] = useState(false);

  // get the current theme from uniwind
  const { theme, hasAdaptiveThemes } = useUniwind();
  const selectedTheme = hasAdaptiveThemes ? 'system' : theme;

  // set the icon color based on the current theme
  const iconColor = theme === 'dark' ? 'white' : 'black';

  // get the toast function from heroui
  const { toast } = useToast();

  // function to handle theme change
  async function handleThemeChange(value: string) {
    try {
      // save the selected theme to async storage
      await AsyncStorage.setItem(THEME_KEY, value);

      // set the theme in uniwind
      Uniwind.setTheme(value as Theme);

      // close the bottom sheet
      setIsOpen(false);
    } catch (error) {
      // log the error
      console.error(error);

      // show an error toast message
      toast.show({
        variant: 'danger',
        label: 'Error',
        description: 'Failed to change theme.',
        icon: <CircleAlert size={24} color="red" />,
        isSwipeable: true,
      });
    }
  }

  // function to animate the chevron icon when the bottom sheet is opened or closed
  const chevronAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(isOpen ? '90deg' : '0deg', { duration: 200 }),
      },
    ],
  }));

  return (
    <View className="gap-y-2">
      <Typography.Heading type="h6">Appearance</Typography.Heading>
      <ListGroup className="w-full">
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheet.Trigger asChild>
            <PressableFeedback asChild>
              <ListGroup.Item>
                <ListGroup.ItemPrefix>
                  <SunMoon size={24} color={iconColor} />
                </ListGroup.ItemPrefix>
                <ListGroup.ItemContent>
                  <ListGroup.ItemTitle>Theme</ListGroup.ItemTitle>
                  <ListGroup.ItemDescription>
                    {selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)}
                  </ListGroup.ItemDescription>
                </ListGroup.ItemContent>
                <ListGroup.ItemSuffix>
                  <Animated.View style={chevronAnimation}>
                    <ChevronRight size={24} color={iconColor} />
                  </Animated.View>
                </ListGroup.ItemSuffix>
              </ListGroup.Item>
            </PressableFeedback>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheet.Overlay />
            <BottomSheet.Content>
              <RadioGroup
                variant="secondary"
                value={selectedTheme}
                onValueChange={handleThemeChange}
              >
                <RadioGroup.Item value="system">System</RadioGroup.Item>
                <Separator />
                <RadioGroup.Item value="light">Light</RadioGroup.Item>
                <Separator />
                <RadioGroup.Item value="dark">Dark</RadioGroup.Item>
              </RadioGroup>
            </BottomSheet.Content>
          </BottomSheet.Portal>
        </BottomSheet>
      </ListGroup>
    </View>
  );
}
