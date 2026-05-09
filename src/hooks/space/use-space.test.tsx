import { useWatch } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { fireEvent, render, screen, waitFor } from "@/lib/test-utils";
import type { SpaceSchema } from "@/schemas/space-schema";
import { useSpace } from "./use-space";

const Harness = ({
  onSubmit,
  initialValues,
}: {
  onSubmit: (data: SpaceSchema) => void;
  initialValues?: Partial<SpaceSchema>;
}) => {
  const { form, phoneFields, handleSubmit } = useSpace({ onSubmit, initialValues });

  const name = useWatch({ control: form.control, name: "name" });
  const address = useWatch({ control: form.control, name: "address" });
  const phones = useWatch({ control: form.control, name: "phones" });

  const nameError = form.formState.errors.name?.message ?? "";
  const addressError = form.formState.errors.address?.message ?? "";
  const phonesError = (form.formState.errors.phones as any)?.message ?? "";

  return (
    <View>
      <Text testID="name">{name}</Text>
      <Text testID="address">{address}</Text>
      <Text testID="phones-count">{phones?.length ?? 0}</Text>
      <Text testID="first-phone">{phones?.[0]?.value ?? ""}</Text>

      <Text testID="name-error">{nameError}</Text>
      <Text testID="address-error">{addressError}</Text>
      <Text testID="phones-error">{phonesError}</Text>

      <Pressable
        testID="set-valid"
        onPress={() => {
          form.setValue("name", "Monastery");
          form.setValue("address", "Somewhere");
          form.setValue("phones", [{ value: "09123456789" }]);
          form.setValue("email", "");
        }}
      >
        <Text>Set valid</Text>
      </Pressable>

      <Pressable
        testID="append-phone"
        onPress={() => {
          phoneFields.append({ value: "099999999" });
        }}
      >
        <Text>Append phone</Text>
      </Pressable>

      <Pressable
        testID="remove-first-phone"
        onPress={() => {
          phoneFields.remove(0);
        }}
      >
        <Text>Remove first phone</Text>
      </Pressable>

      <Pressable testID="submit" onPress={handleSubmit}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
};

describe("useSpace", () => {
  it("starts with default values", () => {
    render(<Harness onSubmit={jest.fn()} />);

    expect(screen.getByTestId("name")).toHaveTextContent("");
    expect(screen.getByTestId("address")).toHaveTextContent("");
    expect(screen.getByTestId("phones-count")).toHaveTextContent("1");
    expect(screen.getByTestId("first-phone")).toHaveTextContent("");
  });

  it("merges initialValues over defaults", () => {
    render(
      <Harness
        onSubmit={jest.fn()}
        initialValues={{
          name: "Initial name",
          phones: [{ value: "0123" }],
        }}
      />,
    );

    expect(screen.getByTestId("name")).toHaveTextContent("Initial name");
    expect(screen.getByTestId("phones-count")).toHaveTextContent("1");
    expect(screen.getByTestId("first-phone")).toHaveTextContent("0123");
  });

  it("does not call onSubmit when invalid and exposes errors", async () => {
    const onSubmit = jest.fn();
    render(<Harness onSubmit={onSubmit} />);

    fireEvent.press(screen.getByTestId("submit"));

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
      expect(screen.getByTestId("name-error")).not.toHaveTextContent("");
      expect(screen.getByTestId("address-error")).not.toHaveTextContent("");
    });
  });

  it("calls onSubmit when valid", async () => {
    const onSubmit = jest.fn();
    render(<Harness onSubmit={onSubmit} />);

    fireEvent.press(screen.getByTestId("set-valid"));
    fireEvent.press(screen.getByTestId("submit"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0]?.[0]).toEqual({
        name: "Monastery",
        address: "Somewhere",
        email: "",
        phones: [{ value: "09123456789" }],
      });
    });
  });

  it("supports appending/removing phone fields", async () => {
    render(<Harness onSubmit={jest.fn()} />);

    fireEvent.press(screen.getByTestId("append-phone"));
    await waitFor(() => {
      expect(screen.getByTestId("phones-count")).toHaveTextContent("2");
    });

    fireEvent.press(screen.getByTestId("remove-first-phone"));
    await waitFor(() => {
      expect(screen.getByTestId("phones-count")).toHaveTextContent("1");
    });
  });
});
