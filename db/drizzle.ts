import { openDatabaseSync } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { eq, Table, type SQL } from 'drizzle-orm';
import { Platform } from 'react-native';
import { SQLiteTableWithColumns } from 'drizzle-orm/sqlite-core';

type DrizzleDatabase = ReturnType<typeof drizzle>;

const LOCAL_DATABASE_NAME = 'RN_DentalLabAcc.db';

interface TableWithId {
  id: number;
}

class DatabaseService {
  private static instance: DatabaseService;
  private db: DrizzleDatabase | null = null;

  private constructor() {
    this.initializeDB();
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  private initializeDB() {
    if (Platform.OS !== 'web') {
      const expoDB = openDatabaseSync(LOCAL_DATABASE_NAME);
      this.db = drizzle(expoDB);
    }
  }

  public async create<T extends Record<string, any>>(
    table: Table,
    data: T
  ): Promise<T | null> {
    if (!this.db) return null;

    try {
      const [result] = await this.db.insert(table)
        .values(data)
        .returning();
      return result as T;
    } catch (error) {
      console.error('Error creating record:', error);
      return null;
    }
  }

  public async getAll<T>(table: Table): Promise<T[]> {
    if (!this.db) return [];

    try {
      return await this.db.select().from(table) as T[];
    } catch (error) {
      console.error('Error getting records:', error);
      return [];
    }
  }

  public async getById<T extends TableWithId>(
    table: SQLiteTableWithColumns<any>,
    id: number
  ): Promise<T | null> {
    if (!this.db) return null;

    try {
      const [result] = await this.db.select()
        .from(table)
        .where(eq((table as any).id, id));
      return result as T || null;
    } catch (error) {
      console.error('Error getting record:', error);
      return null;
    }
  }

  public async update<T extends TableWithId>(
    table: SQLiteTableWithColumns<any>,
    id: number,
    data: Partial<T>
  ): Promise<T | null> {
    if (!this.db) return null;

    try {
      const [result] = await this.db.update(table)
        .set(data)
        .where(eq((table as any).id, id))
        .returning();
      return result as T;
    } catch (error) {
      console.error('Error updating record:', error);
      return null;
    }
  }

  public async delete(
    table: SQLiteTableWithColumns<any>,
    id: number
  ): Promise<boolean> {
    if (!this.db) return false;

    try {
      await this.db.delete(table)
        .where(eq((table as any).id, id));
      return true;
    } catch (error) {
      console.error('Error deleting record:', error);
      return false;
    }
  }  public async getWhere<T>(
    table: Table,
    whereCondition: SQL<unknown> | undefined
  ): Promise<T[]> {
    if (!this.db) return [];

    try {
      return await this.db.select()
        .from(table)
        .where(whereCondition) as T[];
    } catch (error) {
      console.error('Error getting records with condition:', error);
      return [];
    }
  }
}

export const dbService = DatabaseService.getInstance();