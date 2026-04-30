import { Button } from "@/components/ui/button";
import { FormContainer, FormInputField } from "@/components/ui/form";
import { Header } from "@/components/ui/header/header";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { z } from "zod";

const changePasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Must be at least 6 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePassword() {
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data: ChangePasswordFormValues) => {
    console.log({ currentPassword, ...data });
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="w-full flex-row items-center justify-center pb-10">
        <Header title="Change Password" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 16,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <FormContainer>
          <View className="gap-2">
            <Text className="text-base font-medium leading-6 text-black">Current Password</Text>
            <View className="rounded-lg border border-[#B77929] bg-white px-4 py-3">
              <TextInput
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrentPassword}
                placeholder="Enter your current password"
                placeholderTextColor="#A3A3A3"
                className="p-0 text-base leading-6 font-normal text-black"
              />
              <Pressable
                onPress={() => {
                  setShowCurrentPassword((value) => !value);
                }}
                style={{ position: "absolute", right: 16, top: 14 }}
              >
                <MaterialCommunityIcons
                  name={showCurrentPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#171717"
                />
              </Pressable>
            </View>
          </View>

          <FormInputField
            control={form.control}
            name="newPassword"
            label="New Password"
            placeholder="Enter your new password"
            secureTextEntry={!showNewPassword}
            rightIcon={
              <MaterialCommunityIcons name={showNewPassword ? "eye-off-outline" : "eye-outline"} />
            }
            rightIconButtonProps={{
              onPress: () => {
                setShowNewPassword((value) => !value);
              },
            }}
          />

          <FormInputField
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Enter your password"
            secureTextEntry={!showConfirmPassword}
            rightIcon={
              <MaterialCommunityIcons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              />
            }
            rightIconButtonProps={{
              onPress: () => {
                setShowConfirmPassword((value) => !value);
              },
            }}
          />
        </FormContainer>

        <Button
          title="Save"
          onPress={form.handleSubmit(onSubmit)}
          className="w-full rounded-xl bg-[#F0B24D] py-4"
          textClassName="text-[18px] leading-6 font-medium text-black"
        />
      </ScrollView>
    </View>
  );
}
