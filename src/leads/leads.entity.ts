import { Users } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';


export enum LeadStatus {
  NEW = "NEW",
  CONTACTED = "CONTACTED",
  QUALIFIED = "QUALIFIED",
  PROPOSAL_SENT = "PROPOSAL_SENT",
  CONVERTED = "CONVERTED",
  LOST = "LOST",
}

@Entity()
export class Leads{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    mobile: string;

    @Column()
    utm_source: string;

    @Column({ nullable: true })
    utm_medium: string;

    @Column({ nullable: true })
    utm_campaign: string;

    @Column({ nullable: true })
    utm_content: string;

    @Column({ nullable: true })
    remarks: string;

    @Column({
        type: 'enum',
        enum: LeadStatus,
        default: LeadStatus.NEW,
    })
    status: LeadStatus;

    @ManyToOne(() => Users, (user) => user.leads, { eager: true })
    @JoinColumn({ name: 'assignee_id' }) // column in leads table
    assignee: Users;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}