import { Header } from "@/components/ui/header/header";
import { Stack } from "expo-router";

export default function NotificationsScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title="Notifications" />
    </>
  );
}
