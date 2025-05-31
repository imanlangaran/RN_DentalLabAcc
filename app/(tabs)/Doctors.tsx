import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { Doctor, DoctorValues } from '@/models/Doctor'

const Doctors = () => {
  const [doctors, setDoctors] = useState<DoctorValues[]>([])

  useEffect(() => {

    async function get() { setDoctors(await Doctor.getAll()); }

    get();

  }, [])

  return (
    <View >
      <Link href={'/Screens/NewDoctor'}> New Doctor </Link>
      <Text>Doctors</Text>
      {doctors.map((doctor) => (
        <Text key={doctor.id}>{doctor.name}</Text>
      ))}
    </View>
  )
}

export default Doctors