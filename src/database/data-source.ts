import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export const dataSourceOptions: DataSourceOptions = {
    type: isProduction ? 'mysql' : 'postgres',
    host: isProduction ? process.env.SDB_HOST : process.env.DB_HOST,
    port: Number(isProduction ? process.env.SDB_PORT : process.env.DB_PORT),
    username: isProduction ? process.env.SDB_USER : process.env.DB_USER,
    password: isProduction ? process.env.SDB_PASSWORD : process.env.DB_PASSWORD,
    database: isProduction ? process.env.SDB_NAME : process.env.DB_NAME,
    entities: [join(process.cwd(), 'dist', '**', '*.entity{.ts,.js}')],
    migrations: [
        join(
            process.cwd(),
            'dist', 'migrations',
            isProduction ? 'mysql' : 'postgres',
            '*.js'
        )
    ],
    synchronize: false,
};

export const AppDataSource = new DataSource(dataSourceOptions);