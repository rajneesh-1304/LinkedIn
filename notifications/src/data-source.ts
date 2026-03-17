import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { Inbox } from './domain/entity/inbox.entity';
import { Notification } from './domain/entity/notification.entity';

dotenv.config();

const rawDataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [ Inbox, Notification],
  migrations: ['dist/infra/migrations/*.js'],
  seeds: ['dist/seeds/**/*.js'],
  logging: true,
};

export const dataSourceOptions = rawDataSourceOptions as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;