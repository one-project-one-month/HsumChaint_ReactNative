import { fireEvent, render, screen } from "@/lib/test-utils";
import { Button } from ".";

describe("Button", () => {
  const onPress = jest.fn();
  const testId = "btn-login";

  beforeEach(() => {
    render(<Button title="Login" testID={testId} onPress={onPress} />);
    onPress.mockClear();
  });

  it("should be render title correctly", () => {
    expect(screen.getByTestId(testId)).toBeOnTheScreen();
  });

  it("should call onPress when pressed", () => {
    const button = screen.getByTestId(testId);
    fireEvent(button, "press");
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("should not call onPress when disabled", () => {
    render(<Button title="Login" testID={testId} onPress={onPress} disabled />);
    const button = screen.getByTestId(testId);
    fireEvent(button, "press");
    expect(onPress).not.toHaveBeenCalled();
  });
});
