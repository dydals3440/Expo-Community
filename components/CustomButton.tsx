import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import React from "react";
import { colors } from "@/constants";

// 컴포넌트의 props는 type alias대신 interface로
interface CustomButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  variant?: "filled";
}

// 컴포넌트는 함수형으로
function CustomButton({
  label,
  size = "large",
  variant = "filled",
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        styles[variant],
        pressed && styles.pressed,
      ]}
      {...props}
    >
      <Text style={styles[variant]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  large: {
    width: "100%",
    height: 44,
  },
  medium: {},
  filled: {
    backgroundColor: colors.ORANGE_600,
    fontSize: 14,
    fontWeight: "bold",
    color: colors.WHITE,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default CustomButton;
