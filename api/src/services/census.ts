import * as mysql from "mysql2/promise";
import { censusServiceConfig } from "../config/services";

export const pool: mysql.Pool  = mysql.createPool(censusServiceConfig as mysql.PoolOptions);

async function readRows<T>(sql: string, values?: string | string[]): Promise<T[]> {
    const queried = values === undefined ? await pool.query(sql) : await pool.query(sql, values);
    return queried[0] as T[];
}

export interface IColumnName extends mysql.RowDataPacket {
    column_name: string;
}

export type RemainingTotalCount = number;
export type RemainingUniqueValuesCount = number;

export type Success = IColumnName[] | IData[] | RemainingTotalCount[] | RemainingUniqueValuesCount[];
export type Error = string[];

export interface IResponse {
  success: Success;
  status: number;
  error: Error;
}
export const columnNames = async () => {

    try {
        const rows = await readRows<IColumnName>(
            // Selects all columns
            `SELECT column_name AS column_name
             FROM information_schema.columns
             WHERE table_schema = DATABASE() AND table_name = 'census_learn_sql'`,
        );
        return { success: rows, status: 200, error: [] } as IResponse;
    } catch (error) {
        return { success: [], error: [error.message], status: 500 } as IResponse;
    }
};

export interface IUniqueValuesCount {
    [key: string]: number;
}

export interface IData {
    [key: string]: string | number;
}

export const data = async (columnName: string) => {
    try {
        const rows = await readRows<IData>(
          // First 100 distinct values, with the average age of the people in each value.
          `SELECT ??, COUNT(??) as counter, AVG(age) as average
           FROM census_learn_sql GROUP BY ?? ORDER BY COUNT(??) DESC LIMIT 0,100`,
            [columnName, columnName, columnName, columnName],
        );
        return { success: rows, status: 200, error: [] } as IResponse;
    } catch (error) {
        return { success: [], error: [error.message] as Error, status: 500 } as IResponse;
    }
};

export interface ICumulativeUniqueValuesCount {
    [key: string]: number;
}

export interface ITotalCount {
    [key: string]: number;
}

export interface ICumulativeTotalCount {
    [key: string]: number;
}

export const remainingTotalCount = async (columnName: string) => {
    try {
        const cumulativeTotalCountRows = await readRows<ICumulativeTotalCount>(
            // Counts the number of column values
            `SELECT COUNT(??) FROM census_learn_sql LIMIT 0,100`,
            columnName,
        );

        const totalCountRows = await readRows<ITotalCount>(
            // Counts the number of column values
            `SELECT COUNT(??) FROM census_learn_sql`,
            columnName,
        );

        const total = Object.values(totalCountRows[0])[0];
        const shown = Object.values(cumulativeTotalCountRows[0])[0];
        const remaining: number = total - shown;
        return { error: [], status: 200, success: [remaining] as RemainingTotalCount[] } as IResponse;
    } catch (error) {
        return { success: [], error: [error.message], status: 500 } as IResponse;
    }
};

export const remainingUniqueValuesCount = async (columnName: string) => {
    try {
        const cumulativeUniqueValuesCountRows = await readRows<ICumulativeUniqueValuesCount>(
            // Counts the number of distinct column values
            `SELECT COUNT(DISTINCT ??) FROM census_learn_sql LIMIT 0,100`,
            columnName,
        );

        const uniqueValuesCountRows = await readRows<IUniqueValuesCount>(
            // Counts the number of distinct column values
            `SELECT COUNT(DISTINCT ??) FROM census_learn_sql`,
            columnName,
        );

        const total = Object.values(uniqueValuesCountRows[0])[0];
        const shown = Object.values(cumulativeUniqueValuesCountRows[0])[0];
        const remaining: number = total - shown;

        return { error: [], status: 200, success: [remaining] as RemainingUniqueValuesCount[] } as IResponse;
    } catch (error) {
        return { success: [], error: [error.message], status: 500 } as IResponse;
    }
};
