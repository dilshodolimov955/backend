import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MailerModule } from 'src/common/email/email.module';
import { PrismaModule } from 'src/database/prisma.module';


@Module({
  imports: [PrismaModule, MailerModule],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}
