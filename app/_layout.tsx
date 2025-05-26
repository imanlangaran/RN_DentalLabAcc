import i18n from "@/lang/i18n";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import "../global.css";
import { Platform } from "react-native";
import { openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";

const LOCAL_DATABASE_NAME = 'RN_DentalLabAcc.db';

if (Platform.OS !== "web") {
  const expoDB = openDatabaseSync(LOCAL_DATABASE_NAME);
  const db = drizzle(expoDB);
}

export default function RootLayout() {

  // if (Platform.OS !== "web") {
  //   const { success, error } = useMigrations(db, migrations);
  // }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="Screens/NewDoctor"
          options={{
            title: i18n.t("newDoctor"),
            headerBackButtonMenuEnabled: true,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerShadowVisible: false,
            contentStyle: {
              direction: "rtl"
            }
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
