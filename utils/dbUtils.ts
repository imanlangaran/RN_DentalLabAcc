import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync, SQLiteDatabase } from "expo-sqlite";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

export const LOCAL_DATABASE_NAME = 'RN_DentalLabAcc.db';

interface DatabaseInstance {
  db: ExpoSQLiteDatabase<any> | null;
  expoDB: SQLiteDatabase | null;
}
export const MAX_RETRIES = 3;
export const RETRY_DELAY = 1000; // 1 second

export const executeWithRetry = async <T>(operation: () => Promise<T>, retries = MAX_RETRIES): Promise<T> => {
    try {
        return await operation();
    } catch (error) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            return executeWithRetry(operation, retries - 1);
        }
        throw error;
    }
};

export const initializeDatabase = (): DatabaseInstance => {
  try {
    const expoDB = openDatabaseSync(LOCAL_DATABASE_NAME);
    const db = drizzle(expoDB);
    return { db, expoDB };
  } catch (error) {
    console.error('Database initialization error:', error);
    return { db: null, expoDB: null };
  }
};
