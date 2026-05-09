import { fireEvent, render, screen } from "@/lib/test-utils";
import CalendarStrip from "./calendar-strip";

const mockSetParams = jest.fn();
let mockGlobalSearchParams: { date?: string } = {};

jest.mock("expo-router", () => ({
  router: {
    setParams: (...args: any[]) => mockSetParams(...args),
  },
  useGlobalSearchParams: () => mockGlobalSearchParams,
}));

jest.mock("@assets/icons", () => ({
  __esModule: true,
  default: {
    arrowLeft: 1,
    arrowRight: 2,
  },
}));

jest.mock("../ui/image", () => {
  const { Image } = require("react-native");
  return {
    Image: (props: any) => <Image {...props} />,
  };
});

describe("CalendarStrip", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-05-15T12:00:00.000Z"));
    mockSetParams.mockClear();
    mockGlobalSearchParams = {};
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the current month and highlights the selected date (default: today)", () => {
    render(<CalendarStrip />);

    expect(screen.getByText("May, 2026")).toBeOnTheScreen();

    // Selected date: 2026-05-15
    const selectedDayOfMonth = screen.getByText("15");
    expect(selectedDayOfMonth.props.className).toContain("text-natural-white");
  });

  it("uses the `date` search param as the selected date", () => {
    mockGlobalSearchParams = { date: "2026-06-01" };
    render(<CalendarStrip />);

    expect(screen.getByText("June, 2026")).toBeOnTheScreen();

    const selectedDayOfMonth = screen.getByText("1");
    expect(selectedDayOfMonth.props.className).toContain("text-natural-white");
  });

  it("sets the date param when a day is pressed", () => {
    mockGlobalSearchParams = { date: "2026-06-01" };
    render(<CalendarStrip />);

    const dayTwoText = screen.getByText("2");
    fireEvent.press(dayTwoText.parent as any);

    expect(mockSetParams).toHaveBeenCalledWith({ date: "2026-06-02" });
  });

  it("changes months when pressing the navigation buttons", () => {
    mockGlobalSearchParams = { date: "2026-06-15" };
    render(<CalendarStrip />);

    fireEvent.press(screen.getByLabelText("Next month"));
    expect(screen.getByText("July, 2026")).toBeOnTheScreen();

    fireEvent.press(screen.getByLabelText("Previous month"));
    expect(screen.getByText("June, 2026")).toBeOnTheScreen();

    fireEvent.press(screen.getByLabelText("Previous month"));
    expect(screen.getByText("May, 2026")).toBeOnTheScreen();
  });
});
