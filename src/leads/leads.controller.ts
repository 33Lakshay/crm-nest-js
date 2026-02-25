import { Controller, Post, Get, Body, Patch, Param } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { createLeadDto } from './dto/create-lead.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  addLead(@Body() leadDto: createLeadDto) {
    console.log('kakakaka????????', leadDto);
    return this.leadsService.create(leadDto);
  }

  @Get()
  findAll(){
    return this.leadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number){
    return this.leadsService.findOne(Number(id));
  }

  @Patch()
  updateLead(){
    return 'update lead';
  }

}
