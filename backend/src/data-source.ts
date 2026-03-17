import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './domain/entity/user.entity';
import { Education } from './domain/entity/education.entity';
import { Experience } from './domain/entity/experience.entity';
import { Outbox } from './domain/entity/outbox.entity';
import { Follow } from './domain/entity/follow.entity';
import { Connection } from './domain/entity/connection.entity';
import { Inbox } from './domain/entity/inbox.entity';

dotenv.config();

const rawDataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [User, Education, Experience, Outbox, Follow, Connection, Inbox],
  migrations: ['dist/infra/migrations/*.js'],
  seeds: ['dist/seeds/**/*.js'],
  logging: true,
};

export const dataSourceOptions = rawDataSourceOptions as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;