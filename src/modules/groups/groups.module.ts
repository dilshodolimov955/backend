import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { StudentGroupService } from './student-group/student-group.service';
import { StudentGroupController } from './student-group/student-group.controller';
import { StudentGroupModule } from './student-group/student-group.module';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [StudentGroupModule, PrismaModule],
  controllers: [GroupsController, StudentGroupController],
  providers: [GroupsService, StudentGroupService]
})
export class GroupsModule {}
