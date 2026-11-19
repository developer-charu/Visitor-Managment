import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import Auth from "@/context/Auth";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Auth>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="profile/index"
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen name="pendingRequest" /> */}

          <Stack.Screen
            name="VisitorRequests"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="request/[requests]"
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="PushNotification"
            options={{ headerShown: false }}
          /> */}
        </Stack>
      </Auth>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
