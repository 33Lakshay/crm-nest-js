import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { LeadsModule } from './leads/leads.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Lakshay@1',
      database: 'crm',
      autoLoadEntities: true,
      synchronize: true,
      // logging: true,
    }),
    UsersModule,
    LeadsModule,
  ],
})
export class AppModule {}
