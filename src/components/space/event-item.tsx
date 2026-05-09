import { View } from "react-native";
import { Text } from "../ui/text";

const EventItem = () => {
  return (
    <View className="gap-2 px-4 py-2 rounded-lg bg-yellow-100">
      <View className="flex-row items-center gap-2">
        <View className="border-r border-orange-900 pr-4 self-stretch justify-between">
          <Text className="text-orange-900" variant={"h4"} weight={"bold"} title="21" />
        </View>

        <View className="gap-2">
          <Text
            className="text-orange-900"
            variant={"label1"}
            weight={"bold"}
            title="Full Moon Day Invitation"
          />
          <Text
            className="text-orange-900"
            variant={"label1"}
            weight={"medium"}
            title="Thursday, March 2026"
          />
        </View>
      </View>

      <Text
        className="text-orange-900"
        variant={"body3"}
        weight={"regular"}
        title="Lorem ipsum dolor sit amet consectetur."
      />
    </View>
  );
};

export default EventItem;
