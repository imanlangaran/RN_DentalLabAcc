import Radio from "@/Components/CRadio";
import i18n from "@/lang/i18n";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

const NewDoctor = () => {
  const [value, setValue] = useState("");

  const radioItems = [
    {
      value: "Doctor",
      displayName: i18n.t("Doctor"),
    },
    {
      value: "Clinic",
      displayName: i18n.t("Clinic"),
    },
  ];

  // useEffect(() => {
  //   console.log(value);
  // }, [value]);

  return (
    <View className="px-8 w-full h-full flex justify-center">
      <Radio
        setValue={setValue}
        radioItems={radioItems}
        selectedValue={value}
      />

      {value !== "" && (
        <View className="flex flex-col gap-4 mt-6 justify-center items-center">
          <CInput label="text1" />
          <CInput label="text2" />
          <CInput label="text13" />
        </View>
      )}
    </View>
  );
};

const CInput = ({ label }: any) => {
  return (
    <View className="w-full flex items-start">
      <Text>{label}</Text>
      <TextInput 
      className="w-full p-2 mt-1 border rounded-xl border-none bg-secondary outline-none text-center" 
      />
    </View>
  );
};

export default NewDoctor;
