import { cn } from "@/lib/utils";
import { Pressable } from "react-native";
import { ButtonProps } from "./button";

export const Button = ({ title, variant, size, ...props }: ButtonProps) => {
  return (
    <Pressable {...props} className={cn(props.className)}>
      {title}
    </Pressable>
  );
};
