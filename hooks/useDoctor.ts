import { DoctorValues } from "@/models/Doctor";
import { useState } from "react";

type UIDoctorValues = Omit<DoctorValues, 'type'> & {
  type: "" | DoctorValues["type"]
}

export function useDoctor(initialValues: UIDoctorValues) {
  const [name, setName] = useState(initialValues.name);
  const [type, setType] = useState(initialValues.type);
  const [address, setAddress] = useState(initialValues.address);
  const [phone, setPhone] = useState(initialValues.phone);
  const [phone2, setPhone2] = useState(initialValues.phone2);
  const [colabStartDate, setColabStartDate] = useState(initialValues.colabStartDate);
  const [isActive, setIsActive] = useState(initialValues.isActive);

  // Getters
  const getName = () => name;
  const getType = () => type;
  const getAddress = () => address;
  const getPhone = () => phone;
  const getPhone2 = () => phone2;
  const getColabStartDate = () => colabStartDate;
  const getIsActive = () => isActive;

  // Setters
  const setDoctorName = setName;
  const setDoctorType = setType;
  const setDoctorAddress = setAddress;
  const setDoctorPhone = setPhone;
  const setDoctorPhone2 = setPhone2;
  const setDoctorColabStartDate = setColabStartDate;
  const setDoctorIsActive = setIsActive;

  // Add this new function
  const setDoctor = (doctorData: DoctorValues | null) => {
    if (doctorData) {
      setName(doctorData.name);
      setType(doctorData.type);
      setAddress(doctorData.address);
      setPhone(doctorData.phone);
      setPhone2(doctorData.phone2);
      setColabStartDate(doctorData.colabStartDate);
      setIsActive(doctorData.isActive);
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
    getDoctorValues: () => ({ 
      name, 
      type,
      address, 
      phone, 
      phone2, 
      colabStartDate, 
      isActive 
    } as DoctorValues),
    setDoctor // Add this to the returned object
  };
}
