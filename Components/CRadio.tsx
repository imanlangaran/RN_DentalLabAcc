import { radioItems } from "@/Constants/Types";
import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import StyledButton from "@/Components/StyledButton";

const Radio = ({
  setValue,
  selectedValue,
  radioItems,
  defaultValue,
}: {
  setValue: Dispatch<SetStateAction<'clinic' | 'doctor' | ''>>;
  selectedValue: string;
  radioItems: radioItems[];
  defaultValue: string;
}) => {
  return (
    <View className="flex flex-row justify-between">
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
          defaultValue={defaultValue}
        />
      ))}
    </View>
  );
};

export default Radio;