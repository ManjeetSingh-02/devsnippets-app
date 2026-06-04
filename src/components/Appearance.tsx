// external-imports
import { BottomSheet, ListGroup, RadioGroup, Typography } from 'heroui-native';
import { ChevronDown, ChevronRight, SunMoon } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { Uniwind, useUniwind } from 'uniwind';

// type for theme
type Theme = 'system' | 'light' | 'dark';

// function to render the settings screen
export default function Appearance() {
  // state to manage the bottom sheet open state
  const [isOpen, setIsOpen] = useState(false);

  // get the current theme from uniwind
  const { theme } = useUniwind();
  const iconColor = theme === 'dark' ? 'white' : 'black';

  // function to handle theme change
  function handleThemeChange(value: string) {
    Uniwind.setTheme(value as Theme);
    setIsOpen(false);
  }

  return (
    <View className="gap-y-4">
      <Typography.Heading type="h6">Appearance</Typography.Heading>
      <ListGroup className="w-full">
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheet.Trigger asChild>
            <ListGroup.Item>
              <ListGroup.ItemPrefix>
                <SunMoon size={24} color={iconColor} />
              </ListGroup.ItemPrefix>
              <ListGroup.ItemContent>
                <ListGroup.ItemTitle>Theme</ListGroup.ItemTitle>
                <ListGroup.ItemDescription>System, Light or Dark</ListGroup.ItemDescription>
              </ListGroup.ItemContent>
              <ListGroup.ItemSuffix>
                {isOpen ? (
                  <ChevronDown size={24} color={iconColor} />
                ) : (
                  <ChevronRight size={24} color={iconColor} />
                )}
              </ListGroup.ItemSuffix>
            </ListGroup.Item>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheet.Overlay />
            <BottomSheet.Content>
              <RadioGroup value={theme} onValueChange={handleThemeChange}>
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
