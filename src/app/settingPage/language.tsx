import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header/header";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Stack, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

const currentLanguage = "English (US)";

export default function LanguageScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="w-full flex-row items-center justify-center">
        <Header title="Language" />
      </View>
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 28,
        }}
      >
        <View className="flex-1">
          <View className="rounded-xl border border-grey-200 bg-white px-4 py-4 shadow-sm">
            <Pressable
              onPress={() => {
                router.push("/settingPage/language-modal");
              }}
              accessibilityRole="button"
              accessibilityLabel="Choose language"
              className="gap-3"
            >
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons name="earth" size={20} color="#171007" />
                <Text className="text-[16px]/[24px] font-medium text-black">Choose language</Text>
              </View>

              <View className="flex-row items-center justify-between rounded-lg border border-grey-400 bg-white px-4 py-3">
                <Text className="text-[16px]/[24px] text-natural-black">{currentLanguage}</Text>
                <MaterialCommunityIcons name="chevron-down" size={24} color="#171717" />
              </View>
            </Pressable>

            <Text className="mt-3 text-sm text-grey-700">
              Choose the language you would like to use.
            </Text>
          </View>

          <View className="mt-auto flex-row gap-4 pt-8">
            <Button
              title="Cancel"
              variant="outline"
              size="lg"
              className="flex-1"
              onPress={() => {
                router.back();
              }}
            />
            <Button
              title="Save"
              size="lg"
              className="flex-1"
              onPress={() => {
                console.log("Save language", currentLanguage);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
