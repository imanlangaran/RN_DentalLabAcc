import BottomButton from "@/Components/BottomButton";
import CInput from "@/Components/CInput";
import Radio from "@/Components/CRadio";
import DoctorSelector from "@/Components/DoctorSelector";
import i18n from "@/lang/i18n";
import { useDoctor } from "@/hooks/useDoctor";
import { Alert, Platform, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Doctor } from "@/models/Doctor";
import { buttomButtonStyle } from "@/styles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useCallback, useState } from "react";
import { KeyboardProvider, useKeyboardState } from "react-native-keyboard-controller";
import StyledButton from "@/Components/StyledButton";

const DEFAULT_VALUE = "";

enum state { 'new', 'edit', 'notLoaded' }

const NewDoctor = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [fakePaddingSV, setFakePaddingSV] = useState<number>(0);
  const [thisState, setThisState] = useState<state>(state.notLoaded);
  const [showDoctorSelector, setShowDoctorSelector] = useState(false);
  const [selectedDoctors, setSelectedDoctors] = useState<Doctor[]>([]);
  const { height } = useKeyboardState();
  const doctor = useDoctor({
    name: "",
    type: DEFAULT_VALUE,
    address: "",
    phone: "",
    phone2: "",
    colabStartDate: new Date(),
    isActive: true,
  });

  const radioItems = [
    {
      value: "doctor",
      displayName: i18n.t("Doctor"),
    },
    {
      value: "clinic",
      displayName: i18n.t("Clinic"),
    },
  ];

  const loadDoctor = useCallback(async () => {
    if (id) {
      try {
        const doctorData = await Doctor.getById(Number(id));
        if (doctorData) {
          doctor.setDoctor(doctorData);
        } else {
          Alert.alert(i18n.t("Error"), i18n.t("Doctor not found"));
        }
      } catch (error) {
        console.error("Error loading doctor:", error);
        Alert.alert(i18n.t("Error"), i18n.t("Error loading doctor"));
      } finally {
        setThisState(state.edit);
      }
    } else {
      setThisState(state.new);
    }
  }, [id, doctor.setDoctor]);

  useEffect(() => {
    if (thisState === state.notLoaded) loadDoctor();
  }, [loadDoctor]);

  const handleSave = async () => {
    if (doctor.type === DEFAULT_VALUE) return;

    const doctorInstance = new Doctor({
      id: (id && thisState === state.edit) ? Number(id) : undefined,
      name: doctor.name,
      type: doctor.type,
      address: doctor.address,
      phone: doctor.phone,
      phone2: doctor.phone2,
      colabStartDate: doctor.colabStartDate,
      isActive: doctor.isActive,
      associatedDoctors: selectedDoctors.map(d => d.id!), // Add associated doctors
    });

    const result = await doctorInstance.save();

    if (result) {
      if (Platform.OS === "web") {
        window.alert(i18n.t("Successfully Saved"));
      } else {
        Alert.alert(i18n.t("Success"), i18n.t("Successfully Saved"));
      }

      router.back();
    }
  };

  return (

    <KeyboardProvider>
      <View className="screen-container">
        <View className='flex justify-center w-full flex-1'>


          <ScrollView
            className='flex w-full h-full px-8 '
            contentContainerClassName='grow justify-center'
            keyboardDismissMode='on-drag'>

            {(thisState === state.new) && (
              <Radio
                setValue={doctor.setType}
                radioItems={radioItems}
                selectedValue={doctor.type}
                defaultValue={DEFAULT_VALUE}
              />
            )}

            {(thisState === state.edit) && (
              // <Radio
              //   radioItems={
              //     radioItems.filter(item => item.value === doctor.type)
              //   }
              //   selectedValue={doctor.type}
              //   disabled
              // />
              <StyledButton
                label={radioItems.filter(item => item.value === doctor.type)[0].displayName}
                selected
                disabled
                containerClassName="w-full mb-2"
                textClassName="py-2 text-2xl"
              />
            )}

            {doctor.type !== DEFAULT_VALUE && (
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

                {/* Doctor selector section */}
                {(doctor.type === 'clinic') && (

                  <View className="w-full flex items-start">
                    <Text className="text-black text-xl mb-2">{i18n.t("Associated Doctors")}</Text>
                    <TouchableOpacity
                      className="w-full p-2 rounded-3xl bg-secondary"
                      onPress={() => setShowDoctorSelector(true)}
                    >
                      <Text className="text-center text-primary text-xl py-2">
                        {selectedDoctors.length
                          ? `${selectedDoctors.length} ${i18n.t("Doctors Selected")}`
                          : i18n.t("Select Doctors")}
                      </Text>
                    </TouchableOpacity>

                    {/* Selected doctors list */}
                    {selectedDoctors.length > 0 && (
                      <View className="w-full mt-2">
                        {selectedDoctors.map((doctor) => (
                          <View key={doctor.id} className="flex-row justify-between items-center bg-secondary/50 rounded-xl p-2 mb-2">
                            <Text className="text-primary">{doctor.name}</Text>
                            <TouchableOpacity
                              onPress={() => setSelectedDoctors(selectedDoctors.filter(d => d.id !== doctor.id))}
                              className="bg-primary/10 p-2 rounded-full"
                            >
                              <Text className="text-primary">✕</Text>
                            </TouchableOpacity>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Doctor selector modal */}
                    <DoctorSelector
                      visible={showDoctorSelector}
                      onClose={() => setShowDoctorSelector(false)}
                      onSelect={(selectedDoctor) => {
                        if (!selectedDoctors.some(d => d.id === selectedDoctor.id)) {
                          setSelectedDoctors([...selectedDoctors, selectedDoctor]);
                        }
                      }}
                      selectedDoctors={selectedDoctors}
                    />
                  </View>
                )}


              </View>
            )}


            <View
              className='w-full'
              style={{ height: fakePaddingSV }}
            />
          </ScrollView>

          {/* container for buttom button */}
          <View
            className='absolute bottom-0 left-0 right-0 w-full flex items-center'
          >

            <View
              style={buttomButtonStyle.button}
              onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setFakePaddingSV(height);
              }}
            >
              <BottomButton
                title={i18n.t("Save Doctor")}
                disable={doctor.type === ""}
                disabledText={i18n.t("Select")}
                onPress={handleSave}
                className="py-3"
              />
            </View>
          </View>
        </View >

        {/* keyboard view */}
        <View
          className='w-full'
          style={{ height: height }}
        />
      </View>

    </KeyboardProvider >
  );
};

export default NewDoctor;
