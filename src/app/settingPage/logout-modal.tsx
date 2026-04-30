import { Button } from "@/components/ui/button";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Stack, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function LogoutModal() {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center bg-black/10 px-6">
      <Stack.Screen options={{ headerShown: false, presentation: "transparentModal" }} />
      <View className="rounded-2xl border border-grey-200 bg-white">
        <View className="flex-row items-center justify-center px-4 py-4">
          <Text className="text-[18px]/[26px] font-medium text-black">Logout</Text>
          <Pressable
            onPress={() => {
              router.back();
            }}
            hitSlop={10}
            className="absolute right-4"
          >
            <MaterialCommunityIcons name="close" size={20} color="#F2A64B" />
          </Pressable>
        </View>

        <View className="h-px bg-grey-200" />

        <View className="items-center px-4 py-5">
          <Text className="text-[18px]/[26px] font-medium text-black">Are you sure?</Text>
        </View>

        <View className="flex-row gap-4 px-4 pb-5">
          <Button
            title="No"
            variant="outline"
            size="lg"
            className="flex-1"
            onPress={() => {
              router.back();
            }}
          />
          <Button
            title="Yes"
            size="lg"
            className="flex-1 bg-[#F2A64B]"
            onPress={() => {
              router.replace("/login" as never);
            }}
          />
        </View>
      </View>
    </View>
  );
}
