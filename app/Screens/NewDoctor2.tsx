import { View } from 'react-native'
import React from 'react'
import BottomButton from '@/Components/BottomButton'
import { buttomButtonStyle } from '@/styles'

const NewDoctor2 = () => {
  return (
    <View className='screen-container'>
      <View className='flex justify-center w-full flex-1 bg-red-800'>

        {/* container for buttom button */}
        <View className='absolute bottom-0 left-0 right-0 h-16 w-full flex items-center '>
          <View 
          // className='h-full w-10/12 bg-blue-300'
          style={buttomButtonStyle.button}
          >

            <BottomButton
              title={"Save Doctor"}
              disable={false}
              disabledText={"Select"}
              onPress={() => { }}
              className="mt-8 py-3"
            />
          </View>
        </View>
      </View>

      {/* keyboard view */}
      <View className='w-full h-[200px]' />
    </View>
  )
}

export default NewDoctor2