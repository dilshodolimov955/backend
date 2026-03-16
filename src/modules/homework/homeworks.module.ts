import { Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/common/cloudinary/cloudinary.module';
import { HomeworkResultsModule } from './homework-results/homework-results.module';
import { HomeworkResponseModule } from './homework-response/homework-response.module';
import { HomeworkController } from './homeworks.controller';
import { HomeworkService } from './homeworks.service';

@Module({
  imports: [CloudinaryModule, HomeworkResultsModule, HomeworkResponseModule],
  controllers: [HomeworkController],
  providers: [HomeworkService],
})
export class HomeworkModule {}
