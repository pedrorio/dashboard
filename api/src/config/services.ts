import * as dotenv from "dotenv";
import * as mysql from "mysql2";
dotenv.config();

export const censusServiceConfig: mysql.PoolOptions = {
    connectionLimit: 15,
    database: process.env.CENSUS_DB_NAME,
    host: process.env.CENSUS_DB_HOST,
    password: process.env.CENSUS_DB_PASSWORD,
    port: process.env.CENSUS_DB_PORT ? Number(process.env.CENSUS_DB_PORT) : undefined,
    queueLimit: 0,
    user: process.env.CENSUS_DB_USER,
    waitForConnections: true,
};
