import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import * as fs from 'fs';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const isLocal = process.env.NODE_ENV === 'local';

// Read CA cert from file (same approach as your working Express code)
const getCACert = (): string | undefined => {
    // Vercel: use base64 env var
    if (process.env.SSL_DB_CERT_BASE64) {
        return Buffer.from(process.env.SSL_DB_CERT_BASE64, 'base64').toString('utf-8');
    }
    // Local/server: read from file
    try {
        const certPath = join(process.cwd(), 'src', 'config', 'certs', 'ca.pem');
        return fs.readFileSync(certPath).toString();
    } catch {
        console.warn('⚠️  CA cert file not found, skipping...');
        return undefined;
    }
};

const productionConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.SDB_HOST,
    port: Number(process.env.SDB_PORT) || 5432,
    username: process.env.SDB_USER,
    password: process.env.SDB_PASSWORD,
    database: process.env.SDB_NAME,
    entities: [join(process.cwd(), 'dist', '**', '*.entity.js')],
    migrations: [join(process.cwd(), 'dist', 'migrations', '*.js')],
    synchronize: true,
    ssl: {
        rejectUnauthorized: false,
        ca: getCACert(),
    },
};

const localConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [join(process.cwd(), 'dist', '**', '*.entity.js')],
    migrations: [join(process.cwd(), 'dist', 'migrations', '*.js')],
    synchronize: false,
    ssl: false,
};

export const dataSourceOptions: DataSourceOptions = isLocal ? localConfig : productionConfig;

export const AppDataSource = new DataSource(dataSourceOptions);

// Test connection and log result
if (require.main === module) {
    AppDataSource.initialize()
        .then(() => {
            console.log(`✅ Database connected`);
            console.log(`   → host: ${isLocal ? process.env.DB_HOST : process.env.SDB_HOST}`);
            console.log(`   → database: ${isLocal ? process.env.DB_NAME : process.env.SDB_NAME}`);
        })
        .catch((err) => {
            console.error(`❌ Database connection failed: ${err.message}`);
        });
}