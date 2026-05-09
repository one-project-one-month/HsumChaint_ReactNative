import { cva } from "class-variance-authority";
import { cloneElement, isValidElement, type ReactElement } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "./button";

export const buttonVariants = cva("flex-row items-center justify-center rounded-xl gap-2.5", {
  variants: {
    variant: {
      primary: "bg-yellow-500",
      secondary: "bg-yellow-500",
      outline: "bg-natural-white border-yellow-700 border",
    },
    size: {
      xs: "p-1 gap-1 rounded-lg",
      sm: "px-2 py-1.5",
      md: "px-4 py-3",
      lg: "px-5 py-4",
    },
    disabled: {
      true: "bg-grey-400",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    disabled: false,
  },
});

const textVariants = cva("font-medium text-center leading-6 text-base", {
  variants: {
    variant: {
      primary: "text-natural-black",
      secondary: "text-natural-black",
      outline: "text-yellow-700",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-xl",
    },
    disabled: {
      true: "text-grey-200",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    disabled: false,
  },
});

const iconColorVariants = {
  disable: "#eeeeee",
  primary: "#171007",
  secondary: "#171007",
  outline: "#aa7e3a",
};
const iconSizeVariants = {
  xs: 16,
  sm: 16,
  md: 20,
  lg: 24,
};

export const Button = ({
  title,
  variant,
  size,
  leftIcon,
  textClassName,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  const iconColor = disabled ? iconColorVariants.disable : iconColorVariants[variant ?? "primary"];

  const icon =
    leftIcon && isValidElement(leftIcon)
      ? cloneElement(leftIcon as ReactElement<{ color: string; size: number }>, {
          color: iconColor,
          size: iconSizeVariants[size ?? "md"],
        })
      : leftIcon;

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      accessibilityRole="button"
      className={cn(buttonVariants({ variant, size, disabled }), className)}
    >
      {icon ? <View>{icon}</View> : null}
      <Text className={cn(textVariants({ variant, size, disabled }), textClassName)}>{title}</Text>
    </TouchableOpacity>
  );
};
