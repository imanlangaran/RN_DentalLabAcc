/* eslint-disable import/first */
import migrations from "@/drizzle/migrations";
import i18n from "@/lang/i18n";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import { useSQLiteDevTools } from 'expo-sqlite-devtools';
import "../global.css";
import { useEffect, useState } from "react";
import { initializeDatabase } from "@/utils/dbUtils";
import { SQLiteDatabase } from "expo-sqlite";

export default function RootLayout() {
  const [db, setDb] = useState<ExpoSQLiteDatabase<any> | null>(null);
  const [expoDB, setExpoDB] = useState<SQLiteDatabase | null>(null);

  // Always call hooks at the top level
  const { success: migrationSuccess, error: migrationError } = useMigrations(db!, migrations);
  useSQLiteDevTools(expoDB);

  // Initialize database
  useEffect(() => {
    if (Platform.OS !== "web") {
      const { db: newDb, expoDB: newExpoDB } = initializeDatabase();
      if (newDb && newExpoDB) {
        setDb(newDb);
        setExpoDB(newExpoDB);
      }
    }
  }, []);

  // Handle migration errors
  // useEffect(() => {
  //   if (migrationError) {
  //     console.log('Migration error:', migrationError);
  //   }
  // }, [migrationError]);


  console.log('Migration success:', migrationSuccess);
  if (!migrationSuccess) {
    console.log('Migration error:', migrationError);
  }

  // Cleanup database connection
  useEffect(() => {
    return () => {
      if (expoDB) {
        expoDB.closeSync();
      }
    };
  }, [expoDB]);

  return (
    <ThemeProvider value={DefaultTheme}>
      {/* <Stack initialRouteName="Screens/NewDoctor"> */}
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="Screens/NewDoctor"
          options={({ route }: { route: { params?: { title?: string; } } }) => ({
            title: "     " + i18n.t(route.params?.title || "newDoctor") + "     ",
            headerBackButtonMenuEnabled: true,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "white",
            },
            headerShadowVisible: false,
            contentStyle: {
              direction: "rtl"
            }
          })}
        />
        <Stack.Screen name="Screens/NewOrder"/>
      </Stack>
    </ThemeProvider>
  );
}
