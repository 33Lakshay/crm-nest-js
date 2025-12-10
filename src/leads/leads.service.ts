import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leads } from './leads.entity';
import { createLeadDto } from './dto/create-lead.dto';
import { Users } from '../users/user.entity';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Leads)
    private readonly leadsRepository: Repository<Leads>,

    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(dto: createLeadDto) {
    try {
      let assignee = null;

      const { mobile, utm_source } = dto;

      const findLead = await this.leadsRepository.findOne({
        where: { mobile, utm_source },
      });

      if (findLead) {
        throw new BadRequestException('Lead already exists.');
      }

      if (dto.assigneeId) {
        assignee = await this.usersRepository.findOne({
          where: { id: dto.assigneeId },
        });

        if (!assignee) {
          throw new BadRequestException('Invalid assignee user');
        }
      }

      const lead = this.leadsRepository.create({
        ...dto,
        assignee,
      });

      return await this.leadsRepository.save(lead);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      console.error('Lead creation failed:', error);

      throw new InternalServerErrorException('Something went wrong while creating lead');
    }
  }

  findAll() {
    return this.leadsRepository.find();
  }
}
