import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Roles } from 'src/common/decorators/roles';
import { ApiOperation } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { AuthGuard } from 'src/common/guard/jwt.auth.guard';
import { RolesGuard } from 'src/common/guard/roles-guard';


@Controller('lessons')
export class LessonsController {
    constructor(private readonly lessonServise: LessonsService) { }

    @ApiOperation({
        summary: `${Role.SUPERADMIN}, ${Role.ADMIN}, ${Role.TEACHER}`
    })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("ADMIN", "SUPERADMIN","TEACHER")
    @Post()
    createStudentGroup(
        @Body() payload: CreateLessonDto,
        @Req() req: Request
    ) {
        return this.lessonServise.createLesson(payload, req["user"])
    }
}
