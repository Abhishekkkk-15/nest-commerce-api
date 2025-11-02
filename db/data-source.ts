import { DataSource, DataSourceOptions } from 'typeorm';
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'abhishek',
  password: 'secret123',
  database: 'bazarapi',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  logging: false,
  synchronize: true,
  // url: 'postgresql://abhishek:secret123@localhost:5432/bazarapi',
};

export const dataSource = new DataSource(dataSourceOptions);
