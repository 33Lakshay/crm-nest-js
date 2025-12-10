import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leads } from './leads.entity';
import { Users } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Leads, Users])],
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule {}
