import { Module } from '@nestjs/common';
import { CloudinaryUploadService } from './cloudinary.upload';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [CloudinaryUploadService, CloudinaryService],
  exports: [CloudinaryUploadService, CloudinaryService],
})
export class CloudinaryModule {}