import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import * as logger from 'winston';
config();

logger.configure({
  level: 'verbose',
  transports: [new logger.transports.Console()],
});

console.log('process.env.DB_HOST', process.env.DB_HOST);
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrationsTableName: 'migrations',
  entities: ['*/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
});

AppDataSource.initialize()
  .then(() => {
    logger.log('Migration', 'Data Source has been initialized!');
  })
  .catch((err) => {
    logger.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
