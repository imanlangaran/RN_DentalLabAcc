import i18n from "@/lang/i18n";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
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
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
