import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import type { ComponentProps } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import "../../global.css";

import { Avatar } from "@/components/ui/avatar";
import { Header } from "@/components/ui/header/header";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

type SettingsRowItem = {
  title: string;
  iconName: IconName;
  iconColor: string;
  iconBackground: string;
  isDanger?: boolean;
  route:
    | "/settingPage/edit-profile"
    | "/settingPage/change-password"
    | "/settingPage/delete-account"
    | "/settingPage/notifications"
    | "/settingPage/language"
    | "/settingPage/schedule-reminder"
    | "/login";
};

type SettingsSectionProps = {
  title: string;
  rows: SettingsRowItem[];
  onNavigate: (route: SettingsRowItem["route"]) => void;
};

const accountRows: SettingsRowItem[] = [
  {
    title: "Edit Profile",
    iconName: "account-edit-outline",
    iconColor: "#260DB3",
    iconBackground: "#E1DCFF",
    route: "/settingPage/edit-profile",
  },
  {
    title: "Change Password",
    iconName: "lock-reset",
    iconColor: "#08AE1B",
    iconBackground: "#E5FFE8",
    route: "/settingPage/change-password",
  },
  {
    title: "Delete Account",
    iconName: "account-remove-outline",
    iconColor: "#AE1D1D",
    iconBackground: "#F3DEDE",
    isDanger: true,
    route: "/settingPage/delete-account",
  },
];

const preferenceRows: SettingsRowItem[] = [
  {
    title: "Notifications",
    iconName: "bell-outline",
    iconColor: "#260DB3",
    iconBackground: "#E1DCFF",
    route: "/settingPage/notifications",
  },
  {
    title: "Language",
    iconName: "web",
    iconColor: "#CFB107",
    iconBackground: "#FFF3B0",
    route: "/settingPage/language",
  },
];

const scheduleRows: SettingsRowItem[] = [
  {
    title: "Schedule Reminder",
    iconName: "clock-outline",
    iconColor: "#A63807",
    iconBackground: "#FFE2D5",
    route: "/settingPage/schedule-reminder",
  },
];

function SettingsSection({ title, rows, onNavigate }: SettingsSectionProps) {
  return (
    <View className="mx-5 mt-5 rounded-3xl bg-yellow-100 px-4 py-4">
      <Text className="text-[16px]/[22px] font-medium text-black">{title}</Text>

      <View className="mt-2">
        {rows.map((row) => (
          <Pressable
            key={row.title}
            className="flex-row items-center py-3"
            onPress={() => {
              onNavigate(row.route);
            }}
          >
            <View
              className="h-7 w-7 items-center justify-center rounded-md"
              style={{ backgroundColor: row.iconBackground }}
            >
              <MaterialCommunityIcons name={row.iconName} size={16} color={row.iconColor} />
            </View>

            <Text className="ml-3 flex-1 text-[16px]/[22px] font-normal text-black">
              {row.title}
            </Text>

            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={row.isDanger ? "#DC2626" : "#171717"}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const handleNavigate = (route: SettingsRowItem["route"]) => {
    router.push(route as never);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="items-center  px-8 pb-10">
          <View className="w-full flex-row items-center justify-center">
            <Header title="Settings" />
          </View>

          <View className="mt-8 items-center">
            <Avatar source={require("../../../assets/images/icon.png")} size={128} />
            <Pressable
              className="rounded-md px-3"
              onPress={() => {
                router.push("/settingPage/profile");
              }}
            >
              <Text className="mt-4 text-2xl font-semibold text-black">U Law Ti Ka</Text>
            </Pressable>
            <Text className="mt-1 text-base text-[#4B4B4B]">+95 9 422 675 753</Text>
          </View>
        </View>

        <SettingsSection title="Account" rows={accountRows} onNavigate={handleNavigate} />
        <SettingsSection title="Preferences" rows={preferenceRows} onNavigate={handleNavigate} />
        <SettingsSection title="Schedule" rows={scheduleRows} onNavigate={handleNavigate} />

        <View className="mx-5 mt-5 rounded-2xl border border-[#DC2626] py-4">
          <Pressable
            className="flex-row items-center justify-center w-[362px] h-[48px]"
            onPress={() => {
              router.push("/settingPage/logout-modal");
            }}
          >
            <MaterialCommunityIcons name="logout" size={20} color="#AE1D1D" />
            <Text className="ml-2 text-[30px]/[38px] font-medium text-[#DC2626]">Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
