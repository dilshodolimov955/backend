import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { Role, Status } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { AuthGuard } from 'src/common/guard/jwt.auth.guard';
import { RolesGuard } from 'src/common/guard/roles-guard';


@Controller('students')
@ApiBearerAuth()
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }
    @ApiOperation({
        summary: `${Role.SUPERADMIN}, ${Role.ADMIN}`
    })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                fullName: { type: "string" },
                email: { type: "string" },
                password: { type: "string" },
                birth_date: {type: "string",example:"2026-01-02"},
                photo: { type: "string", format: "binary", nullable: true },
            }
        }
    })
    @UseInterceptors(FileInterceptor('photo', {
        storage: diskStorage({
            destination: "./uploads",
            filename: (req, file, cb) => {
                const filename = Date.now() + "." + file.originalname
                cb(null, filename)
            }
        })
    }))
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    @Post()
    createStudent(
        @Body() payload: CreateStudentDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.studentsService.createStudent(payload, file.filename)
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    @Get('all')
    getAllStudent() {
        return this.studentsService.getAllStudents()
    }

    @Get(':id')
    getOneStudent(@Param('id') id: string) {
        return this.studentsService.getOneStudent(+id);
    }
    }
