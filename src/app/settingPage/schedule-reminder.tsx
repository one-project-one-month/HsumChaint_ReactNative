import { Stack } from "expo-router";

import { Header } from "@/components/ui/header/header";

export default function ScheduleReminderScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title="Schedule Reminder" />
    </>
  );
}
