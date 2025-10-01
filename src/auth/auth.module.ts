import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AuthService } from './auth.service';
import { ClientModule } from '../user-client/client.module';
import { ClientService } from '../user-client/client.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { CqrsModule } from '@nestjs/cqrs';

dotenv.config();

@Module({
  imports: [
    ClientModule,
    CqrsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ClientService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
