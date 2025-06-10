import { View, Text, Alert, TouchableOpacity } from "react-native";
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

  const handleInsertSampleDoctor = async () => {
    try {
      const sampleDoctor = new Doctor({
        name: "Dr. Sample",
        type: "doctor",
        address: "123 Sample St",
        phone: "1234567890",
        phone2: "",
        colabStartDate: new Date(),
        isActive: true,
      });

      const result = await sampleDoctor.save();

      if (result) {
        // Reload the doctors list after inserting
        loadDoctors();
      }
    } catch (error) {
      console.error("Error inserting sample doctor:", error);
      Alert.alert("Error", "Error saving doctor");
    }
  };

  return (
    <View className="px-8">
      <View className="flex-row justify-between items-center my-4">
        <Link
          href={"/Screens/NewDoctor"}
          className="bg-primary px-4 py-2 rounded-full"
        >
          <Text className="text-white">New Doctor </Text>
        </Link>

        <TouchableOpacity
          onPress={handleInsertSampleDoctor}
          className="bg-secondary px-4 py-2 rounded-full"
        >
          <Text className="text-primary">Insert Sample Doctor</Text>
        </TouchableOpacity>
      </View>

      <Text>Doctors</Text>
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} onDelete={loadDoctors} />
      ))}
    </View>
  );
};

export default Doctors;
