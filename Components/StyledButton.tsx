import React, { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const StyledButton = ({
  selected = false,
  label,
  value,
  onPress,
  className,
  defaultValue,
}: {
  selected?: boolean;
  label: string;
  value: string;
  onPress: Dispatch<SetStateAction<string>>;
  className?: string;
  defaultValue: string;
}) => {
  return (
    <View className={`w-[47%] md:min-w-56 min-w-24 ${className}`}>
      <TouchableOpacity
        className={`flex items-center justify-center py-2 rounded-full  ${selected ? " bg-primary " : " bg-secondary"
          }`}
        onPress={() => onPress(selected ? defaultValue : value)}
      >
        <Text
          className={`radioItem ${selected ? "text-white" : "text-primary"
            }`}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StyledButton;
