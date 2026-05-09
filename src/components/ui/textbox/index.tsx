import { cva, type VariantProps } from "class-variance-authority";
import {
  type ComponentPropsWithRef,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  TextInput,
  type TextInputProps,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from "react-native";
import { cn } from "@/lib/utils";

const textboxVariants = cva("flex-row items-center rounded-lg gap-1.5", {
  variants: {
    variant: {
      outline: "bg-natural-white border-yellow-700 border",
      contained: "bg-grey-200",
    },
    size: {
      sm: "px-4 py-2",
      md: "px-4 py-3",
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
});

const iconSizeVariants = {
  sm: 16,
  md: 20,
};

export type TextboxProps = {
  leftIcon?: ReactNode;
  leftIconButtonProps?: TouchableOpacityProps;
  rightIcon?: ReactNode;
  rightIconButtonProps?: TouchableOpacityProps;
  containerClassName?: string;
} & VariantProps<typeof textboxVariants> &
  ComponentPropsWithRef<typeof TextInput> &
  TextInputProps;

export const Textbox = ({
  variant,
  size,
  leftIcon,
  leftIconButtonProps,
  rightIcon,
  rightIconButtonProps,
  containerClassName,
  className,
  numberOfLines,
  ...props
}: TextboxProps) => {
  const lIcon =
    leftIcon && isValidElement(leftIcon)
      ? cloneElement(leftIcon as ReactElement<{ color: string; size: number }>, {
          color: "#171007",
          size: iconSizeVariants[size ?? "md"],
        })
      : leftIcon;
  const rIcon =
    rightIcon && isValidElement(rightIcon)
      ? cloneElement(rightIcon as ReactElement<{ color: string; size: number }>, {
          color: "#171007",
          size: iconSizeVariants[size ?? "md"],
        })
      : rightIcon;

  return (
    <View className={cn(textboxVariants({ variant, size }), containerClassName)}>
      {lIcon ? (
        <View className="self-stretch">
          <TouchableOpacity {...leftIconButtonProps}>{lIcon}</TouchableOpacity>
        </View>
      ) : null}
      <TextInput
        className={cn(
          "flex-1 text-base leading-6 font-normal text-natural-black m-0 p-0",
          className,
        )}
        style={{ height: numberOfLines ? numberOfLines * 25 : undefined }}
        placeholderTextColor="#939393"
        textAlignVertical="top"
        numberOfLines={numberOfLines}
        {...props}
      />
      {rIcon ? (
        <View className="self-stretch">
          <TouchableOpacity {...rightIconButtonProps}>{rIcon}</TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};
