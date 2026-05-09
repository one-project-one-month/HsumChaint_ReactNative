import icons from "@assets/icons";
import { TouchableOpacity, View } from "react-native";
import { Image } from "../ui/image";
import { Text } from "../ui/text";

const DonorItem = () => {
  return (
    <View className="flex-row p-2 rounded-lg bg-yellow-100">
      <View className="flex-1 gap-2">
        <Text className="text-orange-900" variant={"label1"} weight={"semibold"} title="Title" />

        <View className="flex-row items-center gap-1">
          <Text
            className="text-orange-900"
            variant={"label2"}
            weight={"semibold"}
            title="Donors:"
          />
          <View className="flex-row items-center">
            <View className="p-1 bg-natural-white rounded-full border border-orange-900 -mr-2.5">
              <Image className="w-4 h-4" source={icons.profile} />
            </View>
            <View className="p-1 bg-natural-white rounded-full border border-orange-900 -mr-2.5">
              <Image className="w-4 h-4" source={icons.profile} />
            </View>
            <View className="p-1 bg-natural-white rounded-full border border-orange-900 -mr-2.5">
              <Image className="w-4 h-4" source={icons.profile} />
            </View>
            <View className="p-1 bg-natural-white rounded-full border border-orange-900 -mr-2.5">
              <Text
                className="text-orange-900 w-4 h-4 text-center"
                variant={"body4"}
                weight={"medium"}
                title="2+"
              />
            </View>
          </View>
        </View>

        <Text variant={"body3"} weight={"regular"} title="Tuesday, March 17, 05:00 AM" />
      </View>
      <View className="flex-row gap-2">
        <TouchableOpacity>
          <Image className="w-6 h-6" source={icons.edit} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image className="w-6 h-6" source={icons.deleteOutline} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DonorItem;
