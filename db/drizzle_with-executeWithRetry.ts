import { openDatabaseSync } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { eq, Table, type SQL } from 'drizzle-orm';
import { Platform } from 'react-native';
import { SQLiteTableWithColumns } from 'drizzle-orm/sqlite-core';
import { executeWithRetry } from '@/utils/dbUtils';

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

    return executeWithRetry(async () => {
      const [result] = await this.db!.insert(table)
        .values(data)
        .returning();
      return result as T;
    });
  }

  public async getAll<T>(table: Table): Promise<T[]> {
    if (!this.db) return [];

    return executeWithRetry(async () => {
      return await this.db!.select().from(table) as T[];
    });
  }

  public async getById<T extends TableWithId>(
    table: SQLiteTableWithColumns<any>,
    id: number
  ): Promise<T | null> {
    if (!this.db) return null;

    return executeWithRetry(async () => {
      const [result] = await this.db!.select()
        .from(table)
        .where(eq((table as any).id, id));
      return result as T || null;
    });
  }

  public async update<T extends TableWithId>(
    table: SQLiteTableWithColumns<any>,
    id: number,
    data: Partial<T>
  ): Promise<T | null> {
    if (!this.db) return null;

    return executeWithRetry(async () => {
      const [result] = await this.db!.update(table)
        .set(data)
        .where(eq((table as any).id, id))
        .returning();
      return result as T;
    });
  }

  public async delete(
    table: SQLiteTableWithColumns<any>,
    id: number
  ): Promise<boolean> {
    if (!this.db) return false;

    return executeWithRetry(async () => {
      await this.db!.delete(table)
        .where(eq((table as any).id, id));
      return true;
    });
  }
  
  public async getWhere<T>(
    table: Table,
    whereCondition: SQL<unknown> | undefined
  ): Promise<T[]> {
    if (!this.db) return [];

    return executeWithRetry(async () => {
      return await this.db!.select()
        .from(table)
        .where(whereCondition) as T[];
    });
  }
}

export const dbService = DatabaseService.getInstance();