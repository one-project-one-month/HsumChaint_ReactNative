import icons from "@assets/icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { Redirect, useRouter } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";

const joined = true; // TODO implement space joined or not state

const SpaceScreen = () => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const router = useRouter();

  if (!joined)
    return (
      <View className="bg-natural-white flex-1">
        <View
          className="flex-1 items-center justify-center px-5"
          style={{ paddingBottom: headerHeight }}
        >
          <View className="gap-2 items-center">
            <Image className="w-16 h-16" source={icons.stackFill} />
            <Text variant={"label1"} weight={"semibold"} title="No Monastery Space" />
            <Text
              className="text-center"
              variant={"label2"}
              weight={"regular"}
              title="Looks like you don't have a monastery space yet. You can create your own or join an existing one now."
            />
          </View>
        </View>

        <View
          className="absolute bottom-0 right-0 left-0 px-5 flex-row items-center gap-3.5"
          style={{ paddingBottom: insets.bottom }}
        >
          <Button
            className="flex-1 shrink-0"
            variant={"outline"}
            title="Join Space"
            onPress={() => router.push("/(space)")} // TODO: update join space route
          />
          <Button
            className="flex-1 shrink-0"
            variant={"primary"}
            title="Create Space"
            onPress={() => router.push("/(space)/create-space")}
          />
        </View>
      </View>
    );

  return <Redirect href={"/(space)/(joined-space-tabs)/donor-list"} />;
};

export default SpaceScreen;
