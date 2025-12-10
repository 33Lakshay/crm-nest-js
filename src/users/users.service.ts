import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users, UserRole } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(dto: CreateUserDto) {
    try {
        const role = dto?.role || UserRole.USER;

        const existingUser = await this.userRepository.findOne({
        where: {
            email: dto.email,
            role: role,
        },
        });

        if (existingUser) {
            throw new ConflictException(
                `User with email ${dto.email} and role ${role} already exists`,
            );
        }

        const user = this.userRepository.create({
            ...dto,
            role,
        });

        return await this.userRepository.save(user);

    } catch (error) {
        if (error instanceof ConflictException) {
            throw error;
        }

        console.error('User creation failed:', error);

        throw new InternalServerErrorException(
            'Something went wrong while creating user',
        );
    }
  }


  findAll() {
    console.log("ayayayaya kyaaaA????");
    return this.userRepository.find();
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }
}
