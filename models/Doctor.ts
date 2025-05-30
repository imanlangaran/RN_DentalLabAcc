import { dbService } from "@/db/drizzle";
import { doctors } from "@/db/schema";

  export type DoctorValues = {
    id?: number;
    name: string;
    address: string;
    phone: string;
    phone2: string;
    colabStartDate: Date;
    isActive: boolean;
    type: "doctor" | "clinic";
  };

export class Doctor {
  private static readonly FIELD_NAMES = {
    name: "name",
    address: "address",
    phone: "phone",
    phone2: "phone2",
    colabStartDate: "colabStartDate",
    isActive: "isActive",
    type: "type",
  } as const;

  public id?: number;
  public name: string;
  public address: string;
  public phone: string;
  public phone2: string;
  public colabStartDate: Date;
  public isActive: boolean;
  public type: "doctor" | "clinic";

  constructor({
    id,
    name,
    address,
    phone,
    phone2,
    colabStartDate,
    isActive,
    type = "doctor",
  }: DoctorValues) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.phone2 = phone2;
    this.colabStartDate = colabStartDate;
    this.isActive = isActive;
    this.type = type;
  }

  private toDatabase(): Record<string, any> {
    return {
      name: this.name,
      type: this.type,
      address: this.address,
      phone: this.phone,
      phone2: this.phone2,
      colabStartDate: this.colabStartDate.toISOString(),
      isActive: this.isActive,
    };
  }

  private static fromDatabase(data: any): Doctor {
    return new Doctor({
      ...data,
      colabStartDate: new Date(data.colabStartDate),
    });
  }

  public activate(): void {
    this.isActive = true;
  }

  public deactivate(): void {
    this.isActive = false;
  }

  public updateInfo(values: Partial<DoctorValues>): void {
    Object.assign(this, values);
  }

  public static get fieldNames() {
    return Doctor.FIELD_NAMES;
  }

  public async save(): Promise<boolean> {
    try {
      const doctorData = this.toDatabase();
      const result = this.id 
        ? await dbService.update(doctors, this.id, doctorData)
        : await dbService.create(doctors, doctorData);

      if (result) {
        this.id = result.id;
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error saving doctor:", error);
      return false;
    }
  }

  public static async getById(id: number): Promise<Doctor | null> {
    try {
      const doctorData = await dbService.getById(doctors, id);
      return doctorData ? Doctor.fromDatabase(doctorData) : null;
    } catch (error) {
      console.error("Error getting doctor by id:", error);
      return null;
    }
  }

  public static async getAll(): Promise<Doctor[]> {
    try {
      const doctorsData = await dbService.getAll(doctors);
      return doctorsData.map(doctor => Doctor.fromDatabase(doctor));
    } catch (error) {
      console.error("Error getting all doctors:", error);
      return [];
    }
  }

  public async delete(): Promise<boolean> {
    if (!this.id) return false;
    return await dbService.delete(doctors, this.id);
  }
}