/* eslint-disable import/first */
import migrations from "@/drizzle/migrations";
import i18n from "@/lang/i18n";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import { useSQLiteDevTools } from 'expo-sqlite-devtools';
import "../global.css";


const LOCAL_DATABASE_NAME = 'RN_DentalLabAcc.db';

let db: any = null;
let expoDB: any = null;

////// shoud be comment when developing ui
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
if (Platform.OS !== "web") {
  expoDB = openDatabaseSync(LOCAL_DATABASE_NAME);
  db = drizzle(expoDB);
}

export default function RootLayout() {

  const { success, error } = useMigrations(db, migrations);
  useSQLiteDevTools(expoDB);


  console.log('error', error);
  console.log('success', success);

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack initialRouteName="Screens/NewDoctor">
      {/* <Stack> */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="Screens/NewDoctor"
          options={{
            title: i18n.t("newDoctor"),
            headerBackButtonMenuEnabled: true,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "white",
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
