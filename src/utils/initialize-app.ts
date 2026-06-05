// internal-imports
import { initDB } from '@/db';
import { THEME_KEY } from '@/constants/storage-keys';

// external-imports
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Uniwind } from 'uniwind';

// type-imports
import type { Theme } from '@/types/theme';

export async function initializeApp() {
  // initialize the database
  await initDB();

  // check for saved theme in AsyncStorage
  const savedTheme = await AsyncStorage.getItem(THEME_KEY);

  // if a theme is saved, use it else default to 'system'
  const appTheme = (savedTheme ?? 'system') as Theme;

  // if no theme is saved, set it to 'system' by default
  if (!savedTheme) await AsyncStorage.setItem(THEME_KEY, appTheme);

  // set the theme in Uniwind
  Uniwind.setTheme(appTheme);
}
