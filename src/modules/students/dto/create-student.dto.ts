import { ApiProperty } from "@nestjs/swagger"
import { Role } from "@prisma/client"
import { Type } from "class-transformer"
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator"


export class CreateStudentDto {
    @ApiProperty()
    @IsString()
    fullName: string

    @ApiProperty()
    @IsString()
    email: string   

    @ApiProperty()
    @IsString()
    password: string

    @ApiProperty()
    @IsDateString()
    birth_date: string

}