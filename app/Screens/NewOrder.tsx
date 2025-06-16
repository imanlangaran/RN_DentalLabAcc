import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const NewOrder = () => {
  const [showDatePicker, setShowDatePicker] = useState(true);



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
          <View className="bg-white rounded-3xl p-6 h-2/3 w-3/4">

          </View>

        </TouchableOpacity>

      </Modal>
    </View>
  )
}

export default NewOrder