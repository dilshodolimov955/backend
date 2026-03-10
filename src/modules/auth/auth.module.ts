import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule} from "@nestjs/jwt"
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports:[ 
    JwtModule.register({
      secret:"nima gap uka",
      signOptions:{
        expiresIn:'1h'
      },
      global:true
    }),
    PrismaModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
