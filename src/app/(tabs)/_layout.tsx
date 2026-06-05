// external-imports
import { Tabs } from 'expo-router';
import { Bolt, House } from 'lucide-react-native';
import { useUniwind } from 'uniwind';

// function to render tab layout
export default function TabLayout() {
  // get the current theme from uniwind
  const { theme } = useUniwind();

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? 'black' : 'white',
          borderTopColor: 'gray',
        },
        tabBarActiveTintColor: theme === 'dark' ? 'white' : 'black',
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
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Bolt size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
