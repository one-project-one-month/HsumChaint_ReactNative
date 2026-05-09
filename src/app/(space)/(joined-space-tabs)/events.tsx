import { View } from "react-native";
import { EventItem } from "@/components/space";

const EventsTab = () => {
  return (
    <View className="gap-4">
      <EventItem />
      <EventItem />
      <EventItem />
    </View>
  );
};

export default EventsTab;
