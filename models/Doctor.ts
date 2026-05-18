import { dbService } from "@/db/drizzle";
import { doctors, doctorAssociations, type Doctor as DrizzleDoctor, type DoctorAssociation } from "@/db/schema";
import { eq, and } from "drizzle-orm";
export type DoctorValues = {
  id?: number;
  name: string;
  address: string;
  phone: string;
  phone2: string;
  colabStartDate: Date;
  isActive: boolean;
  type: "doctor" | "clinic";
  associatedDoctors?: number[];
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
  public associatedDoctors?: number[];

  constructor({
    id,
    name,
    address,
    phone,
    phone2,
    colabStartDate,
    isActive,
    type = "doctor",
    associatedDoctors,
  }: DoctorValues) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.phone2 = phone2;
    this.colabStartDate = colabStartDate;
    this.isActive = isActive;
    this.type = type;
    this.associatedDoctors = associatedDoctors;
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

  private async saveAssociations(): Promise<void> {
    if (!this.id || !this.associatedDoctors?.length) return;

    // Delete existing associations
    const associations = await dbService.getAll<DoctorAssociation>(doctorAssociations);
    const existingAssociations = associations.filter(a => a.doctorId === this.id);

    for (const assoc of existingAssociations) {
      await dbService.delete(doctorAssociations, assoc.id);
    }

    // Insert new associations
    for (const associatedDoctorId of this.associatedDoctors) {
      await dbService.create(doctorAssociations, {
        doctorId: this.id,
        associatedDoctorId,
      });
    }
  }

  private async loadAssociations(): Promise<void> {
    if (!this.id) return;

    const associations = await dbService.getAll<DoctorAssociation>(doctorAssociations);
    const currentDoctorAssociations = associations.filter(a => a.doctorId === this.id);
    this.associatedDoctors = currentDoctorAssociations.map(a => a.associatedDoctorId);
  }

  public static async getById(id: number): Promise<Doctor | null> {
    try {
      const doctorData = await dbService.getById<DrizzleDoctor>(doctors, id);
      if (!doctorData) return null;

      const doctor = Doctor.fromDatabase(doctorData);
      await doctor.loadAssociations();
      return doctor;
    } catch (error) {
      console.error("Error getting doctor by id:", error);
      return null;
    }
  }

  public static async getAll(): Promise<Doctor[]> {
    try {
      const doctorsData = await dbService.getAll<DrizzleDoctor>(doctors);
      const doctorInstances = await Promise.all(
        doctorsData.map(async (data) => {
          const doctor = Doctor.fromDatabase(data);
          await doctor.loadAssociations();
          return doctor;
        })
      );
      return doctorInstances;
    } catch (error) {
      console.error("Error getting all doctors:", error);
      return [];
    }
  }
  
  public static async getAllDoctors(): Promise<Doctor[]> {
    try {
      const doctorsData = await dbService.getWhere<DrizzleDoctor>(
        doctors,
        and(
          eq(doctors.type, 'doctor'),
          eq(doctors.isActive, true)
        )
      );

      const doctorInstances = doctorsData.map((data) => {
        const doctor = Doctor.fromDatabase(data);
        return doctor;
      })
      return doctorInstances;
    } catch (error) {
      console.error("Error getting all doctors:", error);
      return [];
    }
  }

  public async save(): Promise<boolean> {
    try {
      const doctorData = this.toDatabase();
      const result = this.id
        ? await dbService.update(doctors, this.id, doctorData)
        : await dbService.create(doctors, doctorData);

      if (result) {
        this.id = result.id;
        await this.saveAssociations();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving doctor:', error);
      return false;
    }
  }
}