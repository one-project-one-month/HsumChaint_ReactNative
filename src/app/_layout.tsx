import "@/global.css";
import "@/lib/online-manager";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { queryClient } from "@/lib/utils";
import "react-native-reanimated";
import { SafeAreaListener } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Uniwind } from "uniwind";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaListener
        onChange={({ insets }) => {
          Uniwind.updateInsets(insets);
        }}
      >
        <GestureHandlerRootView>
          <KeyboardProvider>
            <ThemeProvider value={DefaultTheme}>
              <BottomSheetModalProvider>
                <Stack initialRouteName="(space)">
                  <Stack.Screen name="(space)" options={{ headerShown: false }} />
                  <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
                </Stack>
                <StatusBar style="auto" />
                <Toast position="bottom" visibilityTime={5000} />
              </BottomSheetModalProvider>
            </ThemeProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </SafeAreaListener>
    </QueryClientProvider>
  );
}
