import { Injectable, NotFoundException } from '@nestjs/common';
import { hashPassword } from 'src/common/config/bcrypt';
import { MailerService } from 'src/common/email/email.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TeachersService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  async createTeacher(payload: CreateTeacherDto, filename: string) {

    const hashedPassword = await hashPassword(payload.password);

    const newTeacher = await this.prisma.teacher.create({
      data: {
        fullName: payload.fullName,
        email: payload.email,
        password: hashedPassword,
        position: payload.position,
        experience: Number(payload.experience), 
        photo: filename ?? null,
      },
    });


    try {
      await this.mailerService.sendEmail(
        payload.email,
        payload.email,
        payload.password,
      );
    } catch (e) {
      console.error('Email yuborishda xatolik:', e.message);
    }

    return {
      success: true,
      message: 'Teacher successfully created',
      data: newTeacher,
    };
  }

  async getAllTeachers() {
    const teachers = await this.prisma.teacher.findMany();
    return {
      success: true,
      data: teachers,
    };
  }

  async getOneTeacher(id: number) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) {
      throw new NotFoundException('Teacher is Not found');
    }

    return {
      success: true,
      data: teacher,
    };
  }

  async updateTeacher(id: number, payload: UpdateTeacherDto) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) {
      throw new NotFoundException('Teacher is Not found');
    }

    
    const updateData: any = { ...payload };
    if (payload.experience) {
      updateData.experience = Number(payload.experience);
    }

    await this.prisma.teacher.update({
      where: { id },
      data: updateData,
    });

    return {
      success: true,
      message: 'Teacher updated successfully',
    };
  }

  async deleteTeacher(id: number) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) {
      throw new NotFoundException('Teacher is Not found');
    }
    await this.prisma.teacher.delete({ where: { id } });
    
    return {
      success: true,
      message: 'Teacher deleted successfully',
    };
  }
}