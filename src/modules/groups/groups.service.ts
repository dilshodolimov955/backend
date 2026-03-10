import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Status, Role, WeekDays } from '@prisma/client'; 
import { CreateGroupDto } from './dto/create-group.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async getGroupLessons(groupId: number, currentUser: { id: number; role: Role }) {
    const existGroup = await this.prisma.group.findUnique({
      where: {
        id: groupId,
        status: Status.ACTIVE, 
      },
    });

    if (!existGroup) {
      throw new NotFoundException('Group not found');
    }

    if (currentUser.role === Role.TEACHER && existGroup.teacherId !== currentUser.id) {
      throw new ForbiddenException('Bu sening guruhing emas');
    }

    const lessons = await this.prisma.lesson.findMany({
      where: {
        groupId,
      },
    });

    return {
      success: true,
      data: lessons,
    };
  }

  async getAllGroup() {
    const groups = await this.prisma.group.findMany({
      where: { status: Status.ACTIVE },
    });

    return {
      success: true,
      data: groups,
    };
  }

  async createGroup(payload: CreateGroupDto, currentUser: { id: number }) {
    const existTeacher = await this.prisma.teacher.findFirst({
      where: {
        id: payload.teacherId,
        status: Status.ACTIVE,
      },
    });

    if (!existTeacher) {
      throw new NotFoundException('Teacher not found with this id');
    }

    const existCourse = await this.prisma.course.findFirst({
      where: {
        id: payload.courseId,
        status: Status.ACTIVE,
      },
      select: {
        durationLesson: true,
      },
    });

    if (!existCourse) {
      throw new NotFoundException('Course not found with this id');
    }

    const existRoom = await this.prisma.room.findFirst({
      where: {
        id: payload.roomId,
        status: Status.ACTIVE,
      },
    });

    if (!existRoom) {
      throw new NotFoundException('Room not found with this id');
    }

  
    const existGroup = await this.prisma.group.findFirst({
      where: {
        name: payload.name,
        courseId: payload.courseId,
      },
    });
    if (existGroup) {
      throw new ConflictException('Group already exist with this course');
    }

    function timeToMinutes(time: string): number {
      const [hour, minute] = time.split(':').map(Number);
      return hour * 60 + minute;
    }

    const roomGroups = await this.prisma.group.findMany({
      where: {
        roomId: payload.roomId,
        status: Status.ACTIVE,
      },
      select: {
        startTime: true,
        weekDays: true,
        course: {
          select: {
            durationLesson: true,
          },
        },
      },
    });

    let newStartMinute = timeToMinutes(payload.startTime);
    let newEndMinute = newStartMinute + existCourse.durationLesson;

    const roomBusy = roomGroups.some((roomGroup) => {
      const commonDays = roomGroup.weekDays.filter((day) =>
        payload.weekDays.includes(day as any),
      );

      if (commonDays.length > 0) {
        let startMinute = timeToMinutes(roomGroup.startTime);
        let endMinute = startMinute + roomGroup.course.durationLesson;

        
        return newStartMinute < endMinute && newEndMinute > startMinute;
      }
      return false;
    });

    if (roomBusy) {
      throw new BadRequestException('Bu vaqtda xona band');
    }


    await this.prisma.group.create({
      data: {
        name: payload.name,
        teacherId: payload.teacherId,
        courseId: payload.courseId,
        roomId: payload.roomId,
        startTime: payload.startTime,
        weekDays: payload.weekDays as WeekDays[], 
        startDate: new Date(payload.startDate),
        userId: currentUser.id,
        status: Status.ACTIVE,
      },
    });

    return {
      success: true,
      message: 'Group created',
    };
  }
}