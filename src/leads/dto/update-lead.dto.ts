import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { LeadStatus } from "../leads.entity";


export class updateLeadDto{
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    mobile?: string;

    @IsOptional()
    @IsString()
    utm_source?: string;

    @IsOptional()
    @IsString()
    utm_medium?: string;

    @IsOptional()
    @IsString()
    utm_campaign?: string;

    @IsOptional()
    @IsString()
    utm_content?: string;

    @IsOptional()
    @IsString()
    remarks?: string;

    @IsOptional()
    @IsEnum(LeadStatus)
    status?: LeadStatus;

    @IsOptional()
    @IsNumber()
    assigneeId: number;
}