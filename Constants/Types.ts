export type DoctorType = 'Doctor' | 'Clinic';

export interface radioItems {
  value: string;
  displayName: string;
};

export interface DoctorValues {
  name: string;
  address: string;
  phone: string;
  phone2: string;
  colabStartDate : Date;
  isActive: boolean;
}