import { IsEmail, IsNotEmpty, IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';

import { LeadStatus } from '../leads.entity';

export class createLeadDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    mobile: string;

    @IsNotEmpty()
    @IsString()
    utm_source: string;

    @IsOptional()
    @IsString()
    utm_medium: string;

    @IsOptional()
    @IsString()
    utm_campaign: string;

    @IsOptional()
    @IsString()
    utm_content: string;

    @IsOptional()
    @IsString()
    remarks: string;

    @IsOptional()
    @IsEnum(LeadStatus)
    status?: LeadStatus;

    @IsOptional()
    @IsNumber()
    assigneeId: number;
}
