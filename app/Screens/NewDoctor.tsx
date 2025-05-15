import Radio from "@/Components/CRadio";
import i18n from "@/lang/i18n";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

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
    <ScrollView className="px-8 w-full h-full ">
      <View className="flex justify-center ">
      <Radio
        setValue={setValue}
        radioItems={radioItems}
        selectedValue={value}
      />

      {value !== "" && (
        <View className="flex flex-col gap-4 mt-6 justify-center items-center">
            <CInput label={`text`} />
        </View>
      )}
    </View>
    </ScrollView>

  );
};

const CInput = ({ label, InputValue, InputValueHandler }: any) => {
  return (
    <View className="w-full flex items-start">
      <Text className="text-black text-xl">{label}</Text>
      <TextInput 
        className="w-full p-2 mt-1 border rounded-xl border-none bg-secondary outline-none text-center border-secondary text-primary text-xl py-3 "
        value={InputValue}
        onChange={InputValueHandler}
      />
    </View>
  );
};

export default NewDoctor;
