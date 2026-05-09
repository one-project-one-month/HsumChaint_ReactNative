import { View } from "react-native";
import { SpaceForm } from "@/components/space";

const EditSpaceScreen = () => {
  return (
    <View className="bg-natural-white flex-1">
      <SpaceForm
        initialValues={{
          name: "Example",
          address: "Example Address",
          email: "example@gmail.com",
          phones: [{ value: "09" }, { value: "081" }],
        }}
        submitLabel="Save"
        onSubmit={(data) => console.log(data)}
      />
    </View>
  );
};

export default EditSpaceScreen;
