import { Module } from '@nestjs/common';
import { HomeworkResponseService } from './homework-response.service';
import { CloudinaryModule } from 'src/common/cloudinary/cloudinary.module';
import { HomeworkResponseController } from './homework-response.controller';

@Module({
  imports: [CloudinaryModule],
  controllers: [HomeworkResponseController],
  providers: [HomeworkResponseService]
})
export class HomeworkResponseModule {}
