// import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
// import { CreateAttendanceDto } from './dto/create-attendance.dto';
// import { Role } from '@prisma/client';
// import { Roles } from 'src/common/decorators/roles';
// import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { Request } from 'express';

// @ApiTags('attendance')
// @Controller('attendance')
// export class AttendanceController {
//   constructor(private readonly ) {}

//   @ApiOperation({ summary: `Ruxsatlar: ${Role.ADMIN}, ${Role.SUPERADMIN}, ${Role.TEACHER}` })
//   @Roles(Role.ADMIN, Role.SUPERADMIN, Role.TEACHER) 
//   @Post()
//   async createAttendance(
//     @Body() payload: CreateAttendanceDto,
//     @Req() req: any 
//   ) {
//     const userId = req.user?.id; 
//     return this.createAttendance(payload,req[`user `]);
//   }
// }