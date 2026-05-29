// external-imports
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

// function to render tab layout
export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="snippets"
        options={{
          title: 'Snippets',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? 'code-slash' : 'code-slash-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
