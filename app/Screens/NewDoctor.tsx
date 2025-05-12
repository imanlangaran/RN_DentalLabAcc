import StyledButton from "@/Components/StyledRadio";
import { radioItems } from "@/Constants/Types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View } from "react-native";

const NewDoctor = () => {
  const [value, setValue] = useState("");
  
  const radioItems = [
    {
      value: "val1",
      displayName: "disp1",
    },
    {
      value: "val2",
      displayName: "disp2",
    },
  ];

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <View className="px-8">
      <Radio setValue={setValue} radioItems={radioItems} selectedValue={value}/>
    </View>
  );
};

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

export default NewDoctor;
