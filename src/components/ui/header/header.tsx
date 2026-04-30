import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  const router = useRouter();

  return (
    <View className="w-full bg-white px-4 pt-10">
      <View className="relative flex-row items-center justify-center py-2">
        <Pressable
          onPress={() => {
            router.back();
          }}
          className="absolute left-0 h-10 w-10 items-start justify-center"
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <MaterialCommunityIcons name="chevron-left" size={30} color="#171717" />
        </Pressable>
        <Text className="text-[20px]/[28px] font-bold text-black">{title}</Text>
      </View>
    </View>
  );
}
