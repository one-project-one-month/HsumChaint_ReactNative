import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FormContainer, FormInputField } from "@/components/ui/form";
import { Header } from "@/components/ui/header/header";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, View } from "react-native";
import { z } from "zod";

const form = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .refine((value) => value.includes("@"), {
      message: 'Email must contain "@"',
    }),
  contactNo: z.string().min(1, "Contact No. is required"),
  address: z.string().min(1, "Address is required"),
});

type FormValues = z.infer<typeof form>;

export default function EditProfile() {
  const router = useRouter();
  const formState = useForm<FormValues>({
    resolver: zodResolver(form),
  });

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="w-full flex-row items-center justify-center">
        <Header title="Edit Profile" />
      </View>

      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 28,
        }}
      >
        <View className="mt-4 items-center">
          <View className="relative">
            <Avatar source={require("../../../assets/images/icon.png")} size={128} />
            <Pressable
              onPress={() => {
                console.log("camera pressed");
              }}
              className="absolute -bottom-1 -right-1 h-9 w-9 items-center justify-center rounded-full border bg-white"
            >
              <MaterialCommunityIcons name="camera-outline" size={18} color="#171717" />
            </Pressable>
          </View>
        </View>

        <View className="w-full px-0 mt-6">
          <FormContainer>
            <FormInputField
              control={formState.control}
              name="name"
              label="Name"
              placeholder="New Name..."
            />
            <FormInputField
              control={formState.control}
              name="email"
              label="Email"
              placeholder="New Email..."
            />
            <FormInputField
              control={formState.control}
              name="contactNo"
              label="Contact No."
              placeholder="New Contact Number...."
            />
            <FormInputField
              control={formState.control}
              name="address"
              label="Address"
              placeholder="New Address..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className="min-h-[136px]"
            />
          </FormContainer>

          <View className="mt-8 flex-row gap-6">
            <Button
              onPress={() => {
                router.back();
              }}
              title="Cancel"
              variant="outline"
              size="lg"
              className="flex-1"
            />

            <Button
              title="Save"
              onPress={formState.handleSubmit((values) => {
                console.log(values);
              })}
              size="lg"
              className="flex-1"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
