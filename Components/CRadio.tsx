import { radioItems } from "@/Constants/Types";
import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import StyledButton from "@/Components/StyledButton";

export const Radio = ({
  setValue,
  selectedValue,
  radioItems,
}: {
  setValue: Dispatch<SetStateAction<string>>;
  selectedValue: string;
  radioItems: radioItems[];
}) => {
  return (
    <View className="flex flex-row justify-evenly">
      {/* <StyledButton label="label1" onPress={setValue} value="val1" />
      <StyledButton label="label2" onPress={setValue} value="val2" /> 
      */}
      {radioItems.map((item, index) => (
        <StyledButton
          key={index}
          label={item.displayName}
          onPress={setValue}
          value={item.value}
          selected={item.value === selectedValue}
        />
      ))}
    </View>
  );
};

export default Radio;