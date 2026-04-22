import { Controller, Post, Get, Body, Patch, Param } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { createLeadDto } from './dto/create-lead.dto';
import { updateLeadDto } from './dto/update-lead.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  addLead(@Body() leadDto: createLeadDto) {
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

  @Patch(':id')
  updateLead(
    @Param('id') id: string,
    @Body() updateLeadDto: updateLeadDto,
  ){
    return this.leadsService.update(Number(id), updateLeadDto);
  }

}
