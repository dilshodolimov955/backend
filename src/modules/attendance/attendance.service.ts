// import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
// import { CreateAttendanceDto } from './dto/create-attendance.dto';
// import { UpdateAttendanceDto } from './dto/update-attendance.dto';
// import { PrismaService } from 'src/database/prisma.service';
// import { Role, Status } from '@prisma/client';

// @Injectable()
// export class AttendanceService {
//   constructor(private prisma: PrismaService) { }

//   // 1. CREATE - Davomat yaratish
//   async createAttendance(payload: CreateAttendanceDto, currentUser: { id: number, role: Role }) {
//     const existLesson = await this.prisma.lesson.findUnique({
//       where: { id: payload.lessonId }
//     });

//     if (!existLesson) {
//       throw new NotFoundException("Ushbu ID bilan dars topilmadi");
//     }

//     const existStudent = await this.prisma.student.findUnique({
//       where: { 
//         id: payload.studentId,
//         status: Status.ACTIVE 
//       }
//     });

//     if (!existStudent) {
//       throw new NotFoundException("Faol talaba topilmadi");
//     }

//     const duplicateAttendance = await this.prisma.attendance.findFirst({
//       where: {
//         lessonId: payload.lessonId,
//         studentId: payload.studentId
//       }
//     });

//     if (duplicateAttendance) {
//       throw new BadRequestException("Ushbu talabaga bu dars uchun allaqachon davomat qilingan");
//     }

//     return this.prisma.attendance.create({
//       data: {
//         lessonId: payload.lessonId,
//         studentId: payload.studentId,
//         isPresent: payload.isPresent,
//         teacherId: currentUser.role === Role.TEACHER ? currentUser.id : payload.teacherId,
//         userId: currentUser.role !== Role.TEACHER ? currentUser.id : payload.userId,
//       },
//       include: {
//         student: true,
//         lesson: true
//       }
//     });
//   }

//   // 2. FIND ALL - Muayyan dars bo'yicha barcha davomatlarni olish
//   async findAllByLesson(lessonId: number) {
//     return this.prisma.attendance.findMany({
//       where: { lessonId },
//       include: {
//         student: { select: { id: true, attendances: true } }, // Faqat kerakli maydonlar
//         lesson: true
//       },
//       orderBy: { created_at: 'desc' }
//     });
//   }

//   // 3. FIND ONE - Bitta davomat ma'lumotini olish
//   async findOne(id: number) {
//     const attendance = await this.prisma.attendance.findUnique({
//       where: { id },
//       include: { student: true, lesson: true }
//     });

//     if (!attendance) {
//       throw new NotFoundException(`ID: ${id} bo'lgan davomat topilmadi`);
//     }

//     return attendance;
//   }

//   // 4. UPDATE - Davomatni o'zgartirish (masalan, xato belgilangan bo'lsa)
//   async update(id: number, payload: UpdateAttendanceDto) {
//     await this.findOne(id); // Borligini tekshirish

//     return this.prisma.attendance.update({
//       where: { id },
//       data: payload,
//     });
//   }

//   // 5. REMOVE - Davomatni o'chirish
//   async remove(id: number) {
//     await this.findOne(id); // Borligini tekshirish
    
//     return this.prisma.attendance.delete({
//       where: { id }
//     });
//   }
// }