import BottomButton from "@/Components/BottomButton";
import CInput from "@/Components/CInput";
import Radio from "@/Components/CRadio";
import i18n from "@/lang/i18n";
import { useDoctor } from "@/hooks/useDoctor";
import { useState } from "react";
import { Alert, Platform, ScrollView, View } from "react-native";
import { Doctor } from "@/models/Doctor";

const NewDoctor = () => {
  const [value, setValue] = useState("");
  const doctor = useDoctor({
    name: "",
    address: "",
    phone: "",
    phone2: "",
    colabStartDate: new Date(),
    isActive: true,
  });

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

  const handleSave = async () => {
    const doctorInstance = new Doctor({
      name: doctor.name,
      address: doctor.address,
      phone: doctor.phone,
      phone2: doctor.phone2,
      colabStartDate: doctor.colabStartDate,
      isActive: doctor.isActive,
    });

    const result = await doctorInstance.save();

    if (result) {
      if (Platform.OS === "web") {
        window.alert(i18n.t("Successfully Saved"));
      } else {
        Alert.alert(i18n.t("Success"), i18n.t("Successfully Saved"));
      }
    }
  };

  return (
    <View className="screen-container">
      <ScrollView className="px-8 w-full bg-white">
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
                label={i18n.t("Name")}
                InputValue={doctor.name}
                InputValueHandler={(text) => doctor.setName(text)}
              />
              <CInput
                label={i18n.t("Address")}
                InputValue={doctor.address}
                InputValueHandler={(text) => doctor.setAddress(text)}
              />
              <CInput
                label={i18n.t("Phone")}
                InputValue={doctor.phone}
                InputValueHandler={(text) => doctor.setPhone(text)}
              />
              <CInput
                label={i18n.t("Phone2")}
                InputValue={doctor.phone2}
                InputValueHandler={(text) => doctor.setPhone2(text)}
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
      <View 
      className="bottom-navigation-bar-container">
        <BottomButton
          title={i18n.t("Save Doctor")}
          disable={value === ""}
          onPress={handleSave}
          className="mt-8 py-3"
        />
      </View>
    </View>
  );
};

export default NewDoctor;
