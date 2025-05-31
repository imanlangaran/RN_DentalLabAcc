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
    <View className='px-8'>
      <Link href={'/Screens/NewDoctor'}> New Doctor </Link>
      <Text>Doctors</Text>
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </View>
  )
}

export const DoctorCard = ({ key, doctor }: {
  key: number | undefined;
  doctor: DoctorValues
}) => {
  return (
    <View className='w-full min-h-54 bg-secondary my-2'>
      <Text >{doctor.name}</Text>

    </View>
  )
}

export default Doctors