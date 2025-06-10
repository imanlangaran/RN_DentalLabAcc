import { radioItems } from "@/Constants/Types";
import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import StyledButton from "@/Components/StyledButton";

const Radio = ({
  setValue,
  selectedValue,
  radioItems,
  defaultValue,
  disabled = false
}: {
  setValue?: Dispatch<SetStateAction<'clinic' | 'doctor' | ''>>;
  selectedValue: string;
  radioItems: radioItems[];
  defaultValue?: string;
  disabled?: boolean;
}) => {
  return (
    <View className={`flex flex-row ${radioItems.length !== 1 ? "justify-between" : "justify-center"}`}>
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
          disabled={disabled}
        />
      ))}
    </View>
  );
};

export default Radio;