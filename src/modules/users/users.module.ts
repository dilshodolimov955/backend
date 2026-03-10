import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MailerModule } from 'src/common/email/email.module';
import { PrismaModule } from 'src/database/prisma.module';
import { CloudinaryModule } from 'src/common/cloudinary/cloudinary.module'; 

@Module({

  imports: [MailerModule, PrismaModule, CloudinaryModule], 
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}