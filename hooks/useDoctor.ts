import { DoctorType } from "@/Constants/Types";
import { Doctor, DoctorValues } from "@/models/Doctor";
import { useState } from "react";

type UIDoctorValues = Omit<DoctorValues, 'type'> & {
  type: DoctorType
}

export function useDoctor(initialValues: UIDoctorValues) {
  const [name, setName] = useState(initialValues.name);
  const [type, setType] = useState(initialValues.type);
  const [address, setAddress] = useState(initialValues.address);
  const [phone, setPhone] = useState(initialValues.phone);
  const [phone2, setPhone2] = useState(initialValues.phone2);
  const [colabStartDate, setColabStartDate] = useState(initialValues.colabStartDate);
  const [isActive, setIsActive] = useState(initialValues.isActive);
  const [selectedDoctors, setSelectedDoctors] = useState<Doctor[]>([]);

  // Getters
  const getName = () => name;
  const getType = () => type;
  const getAddress = () => address;
  const getPhone = () => phone;
  const getPhone2 = () => phone2;
  const getColabStartDate = () => colabStartDate;
  const getIsActive = () => isActive;
  const getSelectedDoctors = () => selectedDoctors;

  // Setters
  const setDoctorName = setName;
  const setDoctorType = setType;
  const setDoctorAddress = setAddress;
  const setDoctorPhone = setPhone;
  const setDoctorPhone2 = setPhone2;
  const setDoctorColabStartDate = setColabStartDate;
  const setDoctorIsActive = setIsActive;
  const setDoctorSelectedDoctors = setSelectedDoctors;
  // Add this new function
  const setDoctor = async (doctorData: DoctorValues) => {
    if (doctorData) {
      setName(doctorData.name);
      setType(doctorData.type);
      setAddress(doctorData.address);
      setPhone(doctorData.phone);
      setPhone2(doctorData.phone2);
      setColabStartDate(doctorData.colabStartDate);
      setIsActive(doctorData.isActive);

      // Handle associated doctors
      if (doctorData.associatedDoctors?.length) {
        // Load each doctor instance
        const doctorPromises = doctorData.associatedDoctors.map(id => Doctor.getById(id));
        const doctors = await Promise.all(doctorPromises);
        // Filter out any null values and set the doctors
        setSelectedDoctors(doctors.filter((d): d is Doctor => d !== null));
      } else {
        setSelectedDoctors([]);
      }
    }
  };

  // Return all
  return {
    name, setName: setDoctorName, getName,
    type, setType: setDoctorType, getType,
    address, setAddress: setDoctorAddress, getAddress,
    phone, setPhone: setDoctorPhone, getPhone,
    phone2, setPhone2: setDoctorPhone2, getPhone2,
    colabStartDate, setColabStartDate: setDoctorColabStartDate, getColabStartDate,
    isActive, setIsActive: setDoctorIsActive, getIsActive,
    selectedDoctors, setSelectedDoctors: setDoctorSelectedDoctors, getSelectedDoctors,
    getDoctorValues: () => ({ 
      name, 
      type,
      address, 
      phone, 
      phone2, 
      colabStartDate, 
      isActive 
    } as DoctorValues),
    setDoctor
  };
}
