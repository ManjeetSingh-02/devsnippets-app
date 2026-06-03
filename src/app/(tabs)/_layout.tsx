// external-imports
import { Tabs } from 'expo-router';
import { Bolt, Code, House } from 'lucide-react-native';
import { useColorScheme } from 'react-native';

// function to render tab layout
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
          borderTopColor: 'gray',
        },
        tabBarActiveTintColor: colorScheme === 'dark' ? 'white' : 'black',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <House size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="snippets"
        options={{
          title: 'Snippets',
          tabBarIcon: ({ color, size }) => <Code size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Bolt size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
