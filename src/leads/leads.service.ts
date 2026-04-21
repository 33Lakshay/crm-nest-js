import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leads } from './leads.entity';
import { createLeadDto } from './dto/create-lead.dto';
import { Users } from '../users/user.entity';
import { updateLeadDto } from './dto/update-lead.dto';

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

      throw new InternalServerErrorException('Something went wrong while creating lead');
    }
  }

  async findAll() {
    return await this.leadsRepository.find();
  }

  async findOne(id: number){
    const data = await this.leadsRepository.findOne({ 
      where: {id}
     })

     if(!data){
      return new NotFoundException(`No lead found with id: ${id}`);
     }

     return data;
  }

  async update(id: number, dto: updateLeadDto){
    try{

      const lead = await this.leadsRepository.findOne({ 
                          where: {id}
                      })

      if(!lead){
        throw new NotFoundException(`No lead found with id: ${id}`);
      }

      Object.assign(lead, dto);

      return await this.leadsRepository.save(lead);

    }catch(err){
      if (err instanceof HttpException) {
        throw err;
      }
      console.log(err);

      throw new InternalServerErrorException('Something went wrong while updating lead');
    }
  }
}
