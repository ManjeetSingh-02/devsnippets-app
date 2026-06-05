// external-imports
import { BottomSheet, ListGroup, PressableFeedback, RadioGroup, Typography } from 'heroui-native';
import { ChevronRight, SunMoon } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Uniwind, useUniwind } from 'uniwind';

// type for theme
type Theme = 'system' | 'light' | 'dark';

// function to render the appearance options
export default function Appearance() {
  // state to manage the bottom sheet open state
  const [isOpen, setIsOpen] = useState(false);

  // get the current theme from uniwind
  const { theme, hasAdaptiveThemes } = useUniwind();
  const selectedTheme = hasAdaptiveThemes ? 'system' : theme;

  // set the icon color based on the current theme
  const iconColor = theme === 'dark' ? 'white' : 'black';

  // function to handle theme change
  function handleThemeChange(value: string) {
    Uniwind.setTheme(value as Theme);
    setIsOpen(false);
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
                <RadioGroup.Item value="light">Light</RadioGroup.Item>
                <RadioGroup.Item value="dark">Dark</RadioGroup.Item>
              </RadioGroup>
            </BottomSheet.Content>
          </BottomSheet.Portal>
        </BottomSheet>
      </ListGroup>
    </View>
  );
}
