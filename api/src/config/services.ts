import * as dotenv from "dotenv";
import * as mysql from "mysql2";
dotenv.config();

export const censusServiceConfig: mysql.PoolOptions = {
    host: process.env.CENSUS_DB_HOST,
    user: process.env.CENSUS_DB_USER,
    database: process.env.CENSUS_DB_NAME,
    port: process.env.CENSUS_DB_PORT,
    password: process.env.CENSUS_DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0,
};
