import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { Outbox } from './domain/outbox.entity';
import { Inbox } from './domain/inbox.entity';
import { Post } from './domain/post.entity';
import { Like } from './domain/like.entity';
import { Comment } from './domain/comment.entity';
import { Repost } from './domain/repost.entity';


dotenv.config();

const rawDataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME2,
  synchronize: false,
  entities: [Outbox, Inbox, Post, Like, Comment, Repost],
  migrations: ['dist/infra/migrations/*.js'],
  seeds: ['dist/seeds/**/*.js'],
  logging: true,
  autoLoadEntities: true, 
};

export const dataSourceOptions = rawDataSourceOptions as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;