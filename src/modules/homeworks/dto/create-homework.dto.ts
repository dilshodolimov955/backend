import { IsInt, IsString, IsOptional, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHomeworkDto {
  @ApiProperty({ example: 1, description: 'Darsning ID raqami' })
  @IsInt()
  @IsNotEmpty()
  lessonId: number;

  @ApiProperty({ example: 'Matematika 1-vazifa', description: 'Uy vazifasi nomi' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 1, description: 'Admin ID (ixtiyoriy)', required: false })
  @IsInt()
  @IsOptional()
  userId?: number;

  @ApiProperty({ example: 2, description: 'O‘qituvchi ID (ixtiyoriy)', required: false })
  @IsInt()
  @IsOptional()
  teacherId?: number;

  @ApiProperty({ example: 'homework_file.pdf', description: 'Fayl yo‘li yoki nomi', required: false })
  @IsString()
  @IsOptional()
  file?: string;

  @ApiProperty({ example: 16, description: 'Vazifa muddati (soatda)', default: 16 })
  @IsInt()
  @IsOptional()
  @Min(1)
  durationTime?: number;
}