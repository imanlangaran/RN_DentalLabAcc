import { Radio } from "@/Components/CRadio";
import i18n from "@/lang/i18n";
import { useState } from "react";
import { Text, View } from "react-native";

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
    </View>
  );
};

export default NewDoctor;
