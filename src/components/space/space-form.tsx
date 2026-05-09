import icons from "@assets/icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useHeaderHeight } from "@react-navigation/elements";
import { Controller } from "react-hook-form";
import { Text as ReactText, ScrollView, TouchableOpacity, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSpace } from "@/hooks/space";
import type { SpaceSchema } from "@/schemas/space-schema";
import { Button } from "../ui/button";
import { FormInputField } from "../ui/form";
import { Image } from "../ui/image";
import { Text } from "../ui/text";
import { Textbox } from "../ui/textbox";

export type SpaceFormProps = {
  submitLabel: string;
  initialValues?: Partial<SpaceSchema>;
  onSubmit: (data: SpaceSchema) => void;
};

const SpaceForm = ({ submitLabel, initialValues, onSubmit }: SpaceFormProps) => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { form, phoneFields, handleSubmit } = useSpace({
    onSubmit,
    initialValues,
  });

  const handleAddPhoneField = () => {
    if (phoneFields.fields.length === 4) return;
    phoneFields.append({ value: "" });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior="padding"
      keyboardVerticalOffset={headerHeight}
    >
      <ScrollView className="flex-1" contentContainerClassName="py-6 px-5 gap-6">
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
            className="font-bold text-yellow-900"
            title="Monastery Information"
            variant={"label1"}
          />
          <FormInputField
            control={form.control}
            name="name"
            label="Monastery Name"
            placeholder="Enter monastery name"
            required
          />
          <FormInputField
            control={form.control}
            name="address"
            label="Address"
            placeholder="Enter your address"
            multiline
            numberOfLines={3}
            required
          />
        </View>

        <View className="gap-4">
          <Text className="font-bold text-yellow-900" title="Contact" variant={"label1"} />
          <FormInputField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter email"
            optional
          />
          <View className="gap-2">
            <View className="flex-row items-center justify-between">
              <ReactText className="font-medium text-base leading-5.5">
                Phone Number
                <ReactText className="text-[#E32A2A]"> *</ReactText>
              </ReactText>
              <Button
                title="Add"
                size={"xs"}
                leftIcon={<Image className="w-4 h-4" source={icons.plus} />}
                disabled={phoneFields.fields.length === 4}
                onPress={handleAddPhoneField}
              />
            </View>
            <View className="gap-2">
              {phoneFields.fields.map((field, index) => (
                <Controller
                  key={field.id}
                  control={form.control}
                  name={`phones.${index}.value`}
                  render={({ field, fieldState }) => (
                    <Textbox
                      placeholder={index === 0 ? "Primary Phone Number" : "Enter Phone Number"}
                      ref={field.ref}
                      value={field.value}
                      onChangeText={field.onChange}
                      rightIcon={index > 0 && <MaterialCommunityIcons name="trash-can-outline" />}
                      rightIconButtonProps={{
                        onPress: () => phoneFields.remove(index),
                      }}
                      containerClassName={fieldState.invalid ? "border-warning border" : ""}
                    />
                  )}
                />
              ))}
            </View>
            <Text
              className="text-grey-700"
              title="Add up to 4 contact numbers for the monastery"
              variant={"label3"}
            />
          </View>
        </View>
      </ScrollView>

      <View className="pt-2 px-5" style={{ paddingBottom: insets.bottom }}>
        <Button title={submitLabel} onPress={handleSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SpaceForm;
