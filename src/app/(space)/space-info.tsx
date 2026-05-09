import icons from "@assets/icons";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";

const SpaceInfo = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="bg-natural-white flex-1">
      <View className="flex-1 py-6 px-5 gap-6">
        <View className="items-center">
          <View className="relative bg-[#d9d9d9] w-[100] h-[100] rounded-full items-center justify-center">
            <Image className="w-10 h-10" source={icons.cameraBoldDuotone} />
            {/* TODO: implement image picker */}
            <TouchableOpacity className="border-yellow-700 border bg-natural-white absolute bottom-0 right-0 w-8 h-8 rounded-full justify-center items-center">
              <Image className="w-5 h-5" source={icons.camera} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="gap-4">
          <Text
            className="text-yellow-900"
            variant={"label1"}
            weight={"bold"}
            title="Monastery Information"
          />
          <View>
            <Text
              className="text-grey-500"
              variant={"label2"}
              weight={"bold"}
              title="Monastery Name"
            />
            <Text variant={"body2"} weight={"regular"} title="Monastery Name" />
          </View>
          <View>
            <Text
              className="text-grey-500"
              variant={"label2"}
              weight={"bold"}
              title="Monastery Address"
            />
            <Text
              variant={"body2"}
              weight={"regular"}
              title="Lorem ipsum dolor sit amet consectetur. Id consectetur massa mi vivamus aliquet."
            />
          </View>
        </View>

        <View className="gap-4">
          <Text className="text-yellow-900" variant={"label1"} weight={"bold"} title="Contact" />
          <View>
            <Text className="text-grey-500" variant={"label2"} weight={"bold"} title="Email" />
            <Text variant={"body2"} weight={"regular"} title="www.example@gmail.com" />
          </View>
          <View>
            <Text
              className="text-grey-500"
              variant={"label2"}
              weight={"bold"}
              title="Phone Number"
            />
            <Text variant={"body2"} weight={"regular"} title="+959987654321" />
          </View>
        </View>
      </View>

      <View className="pt-2 px-5" style={{ paddingBottom: insets.bottom }}>
        <Button title="Edit Info" onPress={() => router.push("/(space)/edit-space")} />
      </View>
    </View>
  );
};

export default SpaceInfo;
