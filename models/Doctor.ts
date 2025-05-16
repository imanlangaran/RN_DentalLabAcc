import { DoctorValues } from "@/Constants/Types";

export class Doctor implements DoctorValues {
  name: string;
  address: string;
  phone: string;
  phone2: string;
  colabStartDate: Date;
  isActive: boolean;

  

  constructor({ name, address, phone, phone2, colabStartDate, isActive }: DoctorValues) {
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.phone2 = phone2;
    this.colabStartDate = colabStartDate;
    this.isActive = isActive;
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  updateInfo(values: Partial<DoctorValues>) {
    Object.assign(this, values);
  }

  static get fieldNames() {
    return DoctorFieldNames;
  }
}

export const DoctorFieldNames = {
  name: "name",
  address: "address",
  phone: "phone",
  phone2: "phone2",
  colabStartDate: "colabStartDate",
  isActive: "isActive",
};
