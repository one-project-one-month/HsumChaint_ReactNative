import { render } from "@testing-library/react-native";
import { ReactElement } from "react";

const AllProviders = ({ children }: { children: ReactElement }) => {
  return children;
};

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react-native";
export { customRender as render };
