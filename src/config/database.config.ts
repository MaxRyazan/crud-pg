import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',
  database: 'for-nestjs',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: "./db/migrations"
  },
}));