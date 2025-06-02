import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "expo-router";
import { Doctor, DoctorValues } from "@/models/Doctor";
import DoctorCard from "@/Components/DoctorCard";

const Doctors = () => {
  const [doctors, setDoctors] = useState<DoctorValues[]>([]);

  const loadDoctors = useCallback(async () => {
    const doctorsList = await Doctor.getAll();
    setDoctors(doctorsList);
  }, []);

  useEffect(() => {
    loadDoctors();
  }, [loadDoctors]);

  return (
    <View className="px-8">
      <Link href={"/Screens/NewDoctor"}> New Doctor </Link>
      <Text>Doctors</Text>
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} onDelete={loadDoctors} />
      ))}
    </View>
  );
};

export default Doctors;
