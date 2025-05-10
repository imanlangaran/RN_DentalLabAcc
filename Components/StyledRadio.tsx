import { View, Text, TouchableOpacity } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'

const StyledRadio = ({
  selected=false,
  label,
  value,
  onPress
}:{
  selected?: boolean;
  label: string;
  value: string;
  onPress: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <View>
      <TouchableOpacity 
        className={`w-2/5 text-center rounded-full py-2 ${selected ? ' text-white bg-primary ' : ' text-primary bg-secondary'}`}
        onPress={() => onPress(value)}
      >
        {label}
      </TouchableOpacity>
    </View>
  )
}

export default StyledRadio