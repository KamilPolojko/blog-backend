import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ClientService } from '../user-client/client.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private clientService: ClientService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    console.log('=== JWT VALIDATION ===');
    console.log('Payload:', payload);
    const user = await this.clientService.findOneByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const { password, ...rest } = user;
    return rest;
  }
}
