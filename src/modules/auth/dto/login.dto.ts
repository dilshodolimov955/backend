import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: "Dilshodolimovv7@gmail.com"})
  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty({ example: "12315678"})
  @IsString() 
  password: string
}
