import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',
  database: 'for-nestjs',
  entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});