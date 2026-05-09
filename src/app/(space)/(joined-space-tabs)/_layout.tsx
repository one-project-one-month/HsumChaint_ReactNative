import icons from "@assets/icons";
import {
  createMaterialTopTabNavigator,
  type MaterialTopTabNavigationEventMap,
  type MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import type { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { Stack, useRouter, withLayoutContext } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { CalendarStrip } from "@/components/space";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const JoinedLayout = () => {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/(space)/space-info")}>
              <Image className="w-6 h-6" source={icons.filter} />
            </TouchableOpacity>
          ),
        }}
      />

      <View className="bg-natural-white flex-1">
        <CalendarStrip />

        <MaterialTopTabs
          screenOptions={{
            tabBarStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
              marginHorizontal: 20,
              marginBottom: 16,
              marginTop: 8,
            },
            tabBarContentContainerStyle: {
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "#e0e0e0", // grey-300
            },
            tabBarItemStyle: {
              flexDirection: "row",
              paddingHorizontal: 8,
              paddingVertical: 16,
              gap: 4,
            },
            tabBarLabel: ({ children, color }) => (
              <Text style={{ color }} variant={"label1"} weight={"semibold"} title={children} />
            ),
            tabBarIndicatorStyle: {
              backgroundColor: "#4c2202", // orange-900
              height: 2.5,
            },
            tabBarInactiveTintColor: "#171007", // natural-black
            tabBarActiveTintColor: "#4c2202", // orange-900
            sceneStyle: {
              backgroundColor: "#ffffff", // natural-white
              paddingHorizontal: 20,
            },
          }}
        >
          <MaterialTopTabs.Screen
            name="donor-list"
            options={{
              title: "Donor List",
              tabBarIcon: ({ color }) => (
                <Image className="w-6 h-6" tintColor={color} source={icons.group} />
              ),
            }}
          />
          <MaterialTopTabs.Screen
            name="events"
            options={{
              title: "Events",
              tabBarIcon: ({ color }) => (
                <Image className="w-6 h-6" tintColor={color} source={icons.starFourFill} />
              ),
            }}
          />
        </MaterialTopTabs>
      </View>
    </>
  );
};

export default JoinedLayout;
