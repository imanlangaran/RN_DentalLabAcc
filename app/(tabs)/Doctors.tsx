import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Doctors = () => {
  return (
    <View>
      <Text>Doctors</Text>
      <Link href={'/Screens/NewDoctor'}> New Doctor </Link>
    </View>
  )
}

export default Doctors