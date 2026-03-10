import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  teacherId: number;

  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @IsNotEmpty()
  @IsString()
  startTime: string; 

  @IsNotEmpty()
  @IsString()
  startDate: string; 

  @IsNotEmpty()
  @IsArray()
  weekDays: string[]; 
}