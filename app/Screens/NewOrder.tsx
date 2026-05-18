import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { DateType } from 'react-native-ui-datepicker';
import Calendar from '@/Components/Calendar';


const NewOrder = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);


  // const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState<DateType>();


  return (
    <View>

      <Text
        className='p-10 rounded-full bg-slate-300'
        onPress={() => setShowDatePicker(true)}
      >show modal</Text>


      <Modal
        visible={showDatePicker}
        transparent
        animationType="fade"
      >
        <TouchableOpacity className="flex-1 bg-black/50 justify-center items-center"
          onPress={() => { setShowDatePicker(false) }}>
          <View className="bg-white rounded-3xl p-2 w-11/12 flex items-center justify-center pb-5">
            <Calendar
              selectedDate={selected}
              setSelectedDate={setSelected}
            />
          </View>

        </TouchableOpacity>

      </Modal>
    </View>
  )
}

export default NewOrder