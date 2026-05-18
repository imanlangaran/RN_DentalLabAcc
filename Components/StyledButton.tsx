import React, { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const StyledButton = ({
  selected = false,
  label,
  value,
  onPress,
  containerClassName,
  textClassName,
  defaultValue,
  disabled = false
}: {
  selected?: boolean;
  label: string;
  value?: string;
  onPress?: Dispatch<SetStateAction<string>>;
  containerClassName?: string;
  textClassName?: string;
  defaultValue?: string;
  disabled?: boolean;
}) => {
  return (
    <View className={`w-[47%] md:min-w-56 min-w-24 ${containerClassName} `}>
      <TouchableOpacity
        className={`flex items-center justify-center py-2 rounded-full  ${selected ? " bg-primary " : " bg-secondary"
          }`}
        onPress={() => onPress(selected ? defaultValue : value)}
        disabled = {disabled}
      >
        <Text
          className={`radioItem ${selected ? "text-white" : "text-primary"
            } ${textClassName}`}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StyledButton;
