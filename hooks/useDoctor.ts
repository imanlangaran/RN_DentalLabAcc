import { DoctorValues } from "@/Constants/Types";
import { useState } from "react";

export function useDoctor(initialValues: DoctorValues) {
  const [name, setName] = useState(initialValues.name);
  const [address, setAddress] = useState(initialValues.address);
  const [phone, setPhone] = useState(initialValues.phone);
  const [phone2, setPhone2] = useState(initialValues.phone2);
  const [colabStartDate, setColabStartDate] = useState(initialValues.colabStartDate);
  const [isActive, setIsActive] = useState(initialValues.isActive);

  // Getters
  const getName = () => name;
  const getAddress = () => address;
  const getPhone = () => phone;
  const getPhone2 = () => phone2;
  const getColabStartDate = () => colabStartDate;
  const getIsActive = () => isActive;

  // Setters
  const setDoctorName = setName;
  const setDoctorAddress = setAddress;
  const setDoctorPhone = setPhone;
  const setDoctorPhone2 = setPhone2;
  const setDoctorColabStartDate = setColabStartDate;
  const setDoctorIsActive = setIsActive;

  // Return all
  return {
    name, setName: setDoctorName, getName,
    address, setAddress: setDoctorAddress, getAddress,
    phone, setPhone: setDoctorPhone, getPhone,
    phone2, setPhone2: setDoctorPhone2, getPhone2,
    colabStartDate, setColabStartDate: setDoctorColabStartDate, getColabStartDate,
    isActive, setIsActive: setDoctorIsActive, getIsActive,
    getDoctorValues: () => ({ name, address, phone, phone2, colabStartDate, isActive })
  };
}
