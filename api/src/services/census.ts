import * as mysql from "mysql2/promise";
import { censusServiceConfig } from "../config/services";

export const pool: mysql.Pool  = mysql.createPool(censusServiceConfig as mysql.PoolOptions);

export const groupedPageLimit = 100;

function groupedPageSql(): string {
    return `SELECT ??, COUNT(??) as counter, AVG(age) as average
            FROM census_learn_sql GROUP BY ?? ORDER BY COUNT(??) DESC LIMIT 0,${groupedPageLimit}`;
}

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
    total: number;
}

export interface IData {
    [key: string]: string | number;
}

export const data = async (columnName: string) => {
    try {
        const rows = await readRows<IData>(
          // First page of distinct values, with the average age of the people in each value.
          groupedPageSql(),
            [columnName, columnName, columnName, columnName],
        );
        return { success: rows, status: 200, error: [] } as IResponse;
    } catch (error) {
        return { success: [], error: [error.message] as Error, status: 500 } as IResponse;
    }
};

export interface ITotalCount {
    total: number;
}

export interface IShownCount {
    shown: number;
}

export const remainingTotalCount = async (columnName: string) => {
    try {
        const totalCountRows = await readRows<ITotalCount>(
            `SELECT COUNT(??) AS total FROM census_learn_sql`,
            columnName,
        );
        const shownRows = await readRows<IShownCount>(
            `SELECT COALESCE(SUM(counter), 0) AS shown FROM (${groupedPageSql()}) t`,
            [columnName, columnName, columnName, columnName],
        );
        const remaining = Number(totalCountRows[0].total) - Number(shownRows[0].shown);
        return { error: [], status: 200, success: [remaining] as RemainingTotalCount[] } as IResponse;
    } catch (error) {
        return { success: [], error: [error.message], status: 500 } as IResponse;
    }
};

export const remainingUniqueValuesCount = async (columnName: string) => {
    try {
        const uniqueValuesCountRows = await readRows<IUniqueValuesCount>(
            `SELECT COUNT(DISTINCT ??) AS total FROM census_learn_sql`,
            columnName,
        );
        const total = Number(uniqueValuesCountRows[0].total);
        const remaining = Math.max(total - groupedPageLimit, 0);
        return { error: [], status: 200, success: [remaining] as RemainingUniqueValuesCount[] } as IResponse;
    } catch (error) {
        return { success: [], error: [error.message], status: 500 } as IResponse;
    }
};
