import { PressableProps } from "react-native";

type ButtonProps = PressableProps &
  Readonly<{
    title: string;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
  }>;
