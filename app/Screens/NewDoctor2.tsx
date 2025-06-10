import { ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import BottomButton from '@/Components/BottomButton'
import { buttomButtonStyle } from '@/styles'
import Radio from '@/Components/CRadio'
import { useDoctor } from '@/hooks/useDoctor'
import i18n from '@/lang/i18n'
import CInput from '@/Components/CInput'
import { KeyboardProvider, useKeyboardState } from "react-native-keyboard-controller";


const DEFAULT_VALUE = "";

const NewDoctor2 = () => {
  const [fakePaddingSV, setFakePaddingSV] = useState<number>(0);
  const doctor = useDoctor({
    name: "",
    type: "doctor",
    address: "",
    phone: "",
    phone2: "",
    colabStartDate: new Date(),
    isActive: true,
  });
  const { height } = useKeyboardState();

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

  return (
    <KeyboardProvider>
      <View className='screen-container'>
        <View className='flex justify-center w-full flex-1'>


          <ScrollView
            className='flex w-full h-full px-8 '
            contentContainerClassName='grow justify-center'
            keyboardDismissMode='on-drag'
          >

            <Radio
              setValue={doctor.setType}
              radioItems={radioItems}
              selectedValue={doctor.type}
              defaultValue={DEFAULT_VALUE}
            />

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
              // className='h-full w-10/12 bg-blue-300'
              style={buttomButtonStyle.button}
              onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setFakePaddingSV(height);
              }}
            >

              <BottomButton
                title={"Save Doctor"}
                disable={false}
                disabledText={"Select"}
                onPress={() => { }}
                className="py-3"
              />
            </View>
          </View>
        </View>

        {/* keyboard view */}
        <View
          // className='w-full h-[300px]' 
          className='w-full'
          style={{height:height}}
          // style={{height:300}}
        />
      </View>
     </KeyboardProvider> 

  )
}

export default NewDoctor2