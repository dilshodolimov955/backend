import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { MailerModule } from 'src/common/email/email.module';
import { PrismaModule } from 'src/database/prisma.module';



@Module({
  imports: [PrismaModule, MailerModule],
  controllers: [TeachersController],
  providers: [TeachersService]
})
export class TeachersModule {}
