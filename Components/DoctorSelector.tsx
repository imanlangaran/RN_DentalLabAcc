import { Doctor } from "@/models/Doctor";
import i18n from "@/lang/i18n";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";

interface DoctorSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (doctor: Doctor) => void;
  selectedDoctors?: Doctor[];
}

const DoctorSelector = ({
  visible,
  onClose,
  onSelect,
  selectedDoctors = [],
}: DoctorSelectorProps) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const doctorsList = await Doctor.getAll();
        setDoctors(doctorsList);
      } catch (error) {
        console.error("Error loading doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    if (visible) {
      loadDoctors();
    }
  }, [visible]);

  const isSelected = (doctor: Doctor) => {
    return selectedDoctors.some((selected) => selected.id === doctor.id);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl p-6 h-2/3">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-primary">
              {i18n.t("Select Doctor")}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-xl text-primary">✕</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" className="flex-1" color="#2260FF" />
          ) : (
            <ScrollView className="flex-1">
              {doctors.map((doctor) => (
                <TouchableOpacity
                  key={doctor.id}
                  onPress={() => {
                    onSelect(doctor);
                    onClose();
                  }}
                  className={`p-4 my-1 rounded-2xl ${
                    isSelected(doctor) ? "bg-secondary" : "bg-gray-100"
                  }`}
                >
                  <Text className="text-lg text-primary">{doctor.name}</Text>
                  <Text className="text-sm text-gray-600">
                    {doctor.type} • {doctor.phone}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default DoctorSelector;
