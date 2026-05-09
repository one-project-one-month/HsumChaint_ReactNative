import { fireEvent, render, screen } from "@/lib/test-utils";
import type { SpaceSchema } from "@/schemas/space-schema";
import SpaceForm from "./space-form";

jest.mock("@assets/icons", () => ({
  __esModule: true,
  default: {
    cameraBoldDuotone: 1,
    camera: 2,
    plus: 3,
  },
}));

jest.mock("@expo/vector-icons/MaterialCommunityIcons", () => {
  const { Text } = require("react-native");
  return (props: any) => <Text {...props} />;
});

jest.mock("@react-navigation/elements", () => ({
  useHeaderHeight: () => 0,
}));

jest.mock("react-native-keyboard-controller", () => {
  const { View } = require("react-native");
  return {
    KeyboardAvoidingView: ({ children, ...props }: any) => <View {...props}>{children}</View>,
  };
});

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock("../ui/button", () => {
  const { Pressable, Text } = require("react-native");
  return {
    Button: ({ title, onPress, disabled }: any) => (
      <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress}>
        <Text>{title}</Text>
      </Pressable>
    ),
  };
});

jest.mock("../ui/form", () => {
  const { Text } = require("react-native");
  return {
    FormInputField: ({ label, name }: any) => <Text>{`${label}:${name}`}</Text>,
  };
});

jest.mock("../ui/image", () => {
  const { Image } = require("react-native");
  return {
    Image: (props: any) => <Image {...props} />,
  };
});

jest.mock("../ui/text", () => {
  const { Text } = require("react-native");
  return {
    Text: ({ title, ...props }: any) => <Text {...props}>{title}</Text>,
  };
});

jest.mock("../ui/textbox", () => {
  const { Pressable, Text, View } = require("react-native");
  return {
    Textbox: ({ placeholder, rightIconButtonProps }: any) => (
      <View>
        <Text>{placeholder}</Text>
        {rightIconButtonProps?.onPress ? (
          <Pressable
            accessibilityRole="button"
            testID={`textbox-remove:${placeholder}`}
            onPress={rightIconButtonProps.onPress}
          >
            <Text>Remove</Text>
          </Pressable>
        ) : null}
      </View>
    ),
  };
});

jest.mock("react-hook-form", () => ({
  Controller: ({ render }: any) =>
    render({
      field: {
        ref: jest.fn(),
        value: "",
        onChange: jest.fn(),
      },
      fieldState: { invalid: false },
    }),
}));

jest.mock("@/hooks/space", () => {
  const React = require("react");

  return {
    useSpace: ({
      onSubmit,
      initialValues,
    }: {
      onSubmit: (data: SpaceSchema) => void;
      initialValues?: Partial<SpaceSchema>;
    }) => {
      const initialPhones = initialValues?.phones?.length
        ? initialValues.phones.map(() => ({ value: "" }))
        : [{ value: "" }];

      const [fields, setFields] = React.useState(
        initialPhones.map((_, index) => ({ id: `phone-${index}` })),
      );

      const phoneFields = {
        fields,
        append: () => setFields((prev: any[]) => [...prev, { id: `phone-${prev.length}` }]),
        remove: (index: number) =>
          setFields((prev: any[]) => prev.filter((_: any, i: number) => i !== index)),
      };

      return {
        form: { control: {} },
        phoneFields,
        handleSubmit: () => {
          onSubmit({
            name: "Monastery",
            address: "Somewhere",
            email: "",
            phones: fields.map(() => ({ value: "09123456789" })),
          });
        },
      };
    },
  };
});

describe("SpaceForm", () => {
  it("renders required sections and submit button label", () => {
    render(<SpaceForm submitLabel="Create" onSubmit={jest.fn()} />);

    expect(screen.getByText("Monastery Information")).toBeOnTheScreen();
    expect(screen.getByText("Contact")).toBeOnTheScreen();
    expect(screen.getByText("Create")).toBeOnTheScreen();
  });

  it("adds phone fields up to 4 and disables Add button at the limit", () => {
    const onSubmit = jest.fn();
    render(<SpaceForm submitLabel="Save" onSubmit={onSubmit} />);

    expect(screen.getByText("Primary Phone Number")).toBeOnTheScreen();
    expect(screen.queryByText("Enter Phone Number")).toBeNull();

    fireEvent.press(screen.getByText("Add"));
    fireEvent.press(screen.getByText("Add"));
    fireEvent.press(screen.getByText("Add"));

    // 4 fields => 1 primary + 3 extra
    expect(screen.getByText("Primary Phone Number")).toBeOnTheScreen();
    expect(screen.getAllByText("Enter Phone Number")).toHaveLength(3);

    fireEvent.press(screen.getByText("Add"));
    expect(screen.getAllByText("Enter Phone Number")).toHaveLength(3);
  });

  it("removes a non-primary phone field", () => {
    render(<SpaceForm submitLabel="Save" onSubmit={jest.fn()} />);

    fireEvent.press(screen.getByText("Add"));
    fireEvent.press(screen.getByText("Add"));

    expect(screen.getAllByText("Enter Phone Number")).toHaveLength(2);

    fireEvent.press(screen.getAllByTestId("textbox-remove:Enter Phone Number")[0] as any);

    expect(screen.getAllByText("Enter Phone Number")).toHaveLength(1);
  });

  it("calls onSubmit when pressing the submit button", () => {
    const onSubmit = jest.fn();
    render(<SpaceForm submitLabel="Submit" onSubmit={onSubmit} />);

    fireEvent.press(screen.getByText("Submit"));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0]?.[0]).toEqual({
      name: "Monastery",
      address: "Somewhere",
      email: "",
      phones: [{ value: "09123456789" }],
    });
  });
});
