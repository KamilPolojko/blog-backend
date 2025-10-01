import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientService } from '../user-client/client.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private clientService: ClientService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, userPassword: string) {
    const user = await this.clientService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException(`Invalid Email`);
    }

    const isPasswordMatched = await bcrypt.compare(userPassword, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException(`Invalid Password`);
    }

    const { password, ...rest } = user;
    return rest;
  }

  async login(user: any) {
    console.log('Creating token for user:', user);
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    console.log('Token created', token);
    return {
      access_token: token,
      user,
    };
  }
}
