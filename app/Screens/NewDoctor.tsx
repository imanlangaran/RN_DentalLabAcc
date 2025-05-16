import CInput from "@/Components/CInput";
import Radio from "@/Components/CRadio";
import i18n from "@/lang/i18n";
import { useDoctor } from "@/models/useDoctor";
import { useState } from "react";
import { ScrollView, View } from "react-native";

const NewDoctor = () => {
  const [value, setValue] = useState("");
  const doctor = useDoctor({
    name: '',
    address: '',
    phone: '',
    phone2: '',
    colabStartDate: new Date(),
    isActive: true,
  })

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
    <ScrollView className="px-8 w-full h-full bg-white">
      <View className={`flex justify-center min-h-full `}>
        {/* <View
  className={`flex ${value === "" ? "flex-1 min-h-[500px] justify-center " : "justify-center"}`}
> */}
        <Radio
          setValue={setValue}
          radioItems={radioItems}
          selectedValue={value}
        />

        {value !== "" && (
          <View className="flex flex-col gap-4 mt-6 justify-center items-center">
            <CInput
              label={i18n.t('Name')}
              InputValue={doctor.name}
              InputValueHandler={(e: any) => doctor.setName(e.nativeEvent.text)}
            />
            <CInput
              label={i18n.t('Address')}
              InputValue={doctor.address}
              InputValueHandler={(e: any) => doctor.setAddress(e.nativeEvent.text)}
            />
            <CInput
              label={i18n.t('Phone')}
              InputValue={doctor.phone}
              InputValueHandler={(e: any) => doctor.setPhone(e.nativeEvent.text)}
            />
            <CInput
              label={i18n.t('Phone2')}
              InputValue={doctor.phone2}
              InputValueHandler={(e: any) => doctor.setPhone2(e.nativeEvent.text)}
            />
            {/* <CInput
              label={i18n.t('Start Colaboration Date')}
              InputValue={doctor.colabStartDate}
              InputValueHandler={(e: any) => doctor.setColabStartDate(e.nativeEvent.text)}
            /> */}
          </View>
        )}
      </View>
    </ScrollView>

  );
};

export default NewDoctor;
