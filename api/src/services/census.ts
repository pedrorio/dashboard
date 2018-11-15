import * as mysql from "mysql2/promise";
import { censusServiceConfig } from "../config/services";

export const pool: mysql.Pool  = mysql.createPool(censusServiceConfig as mysql.PoolOptions);

export interface IColumnName extends mysql.RowDataPacket {
    column_name: string;
}

export type RemainingTotalCount = number;
export type RemainingUniqueValuesCount = number;

export type Success = [] | IColumnName[] | IData[] | RemainingTotalCount[] | RemainingUniqueValuesCount[];
export type Error = string[];

export interface IResponse {
  success: Success;
  status: number;
  error: Error;
}
export const columnNames = async () => {

    try {
        const [rows, fields]: [IColumnName[], mysql.FieldPacket[]] =  await pool.query(
            // Selects all columns
            `SELECT column_name FROM information_schema.columns WHERE table_name = 'census_learn_sql'`,
        );
        return { success: rows as IColumnName[], status: 200, error: [] } as IResponse;
    } catch (error) {
        return { success: [], error: [error.message], status: 500 } as IResponse;
    }
};

export interface IUniqueValuesCount extends mysql.RowDataPacket {
    [key: string]: number;
}

export interface IData extends mysql.RowDataPacket {
    [key: string]: (string | number);
}

export const data = async (columnName: string) => {
    try {
        const [rows, fields]: [IData[], mysql.FieldPacket[]] = await pool.query(
          // Counts the number of the first 100 distinct column values and the average of the ages of the people who belong to those values
          `SELECT ??, COUNT(??) as counter, AVG(age) as average FROM census_learn_sql GROUP BY ?? ORDER BY COUNT(??) DESC LIMIT 0,100`,
            [columnName, columnName, columnName, columnName],
        );
        return { success: rows as IData[], status: 200, error: [] } as IResponse;
    } catch (error) {
        return { success: [], error: [error.message] as Error, status: 500 } as IResponse;
    }
};

export interface ICumulativeUniqueValuesCount extends mysql.RowDataPacket {
    [key: string]: number;
}

export interface ITotalCount extends mysql.RowDataPacket {
    [key: string]: number;
}

export interface ICumulativeTotalCount extends mysql.RowDataPacket {
    [key: string]: number;
}

export const remainingTotalCount = async (columnName: string) => {
    try {
        const [cumulativeTotalCountRows, cumulativeTotalCountFields]: [ICumulativeTotalCount[], mysql.FieldPacket[]] =  await pool.query(
            // Counts the number of column values
            `SELECT COUNT(??) FROM census_learn_sql LIMIT 0,100`,
            columnName,
        );

        const [totalCountRows, totalCountFields]: [ITotalCount[], mysql.FieldPacket[]] =  await pool.query(
            // Counts the number of column values
            `SELECT COUNT(??) FROM census_learn_sql`,
            columnName,
        );

        const remainingTotalCount: number = Object.values(totalCountRows[0])[0] - Object.values(cumulativeTotalCountRows[0])[0];
        return { success: [remainingTotalCount] as RemainingTotalCount[], status: 200, error: [] } as IResponse;
    } catch (error) {
        return { success: [], error: [error.message], status: 500 } as IResponse;
    }
};

export const remainingUniqueValuesCount = async (columnName: string) => {
    try {
        const [cumulativeUniqueValuesCountRows, cumulativeUniqueValuesCountFields]: [ICumulativeUniqueValuesCount[], mysql.FieldPacket[]] = await pool.query(
            // Counts the number of distinct column values
            `SELECT COUNT(DISTINCT ??) FROM census_learn_sql LIMIT 0,100`,
            columnName,
        );

        const [uniqueValuesCountRows, uniqueValuesCountFields]: [IUniqueValuesCount[], mysql.FieldPacket[]] = await pool.query(
            // Counts the number of distinct column values
            `SELECT COUNT(DISTINCT ??) FROM census_learn_sql`,
            columnName,
        );

        const remainingUniqueValuesCount: number = Object.values(uniqueValuesCountRows[0])[0] - Object.values(cumulativeUniqueValuesCountRows[0])[0];

        return { success: [remainingUniqueValuesCount] as RemainingUniqueValuesCount[], status: 200, error: [] } as IResponse;
    } catch (error) {
        return { success: [], error: [error.message], status: 500 } as IResponse;
    }
};
