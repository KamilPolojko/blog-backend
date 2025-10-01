import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { signInClientDTO } from '../user-client/queries/singInClient/dto/signIn-client.dto';
import { AuthService } from './auth.service';

@Controller('/client/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Logs the user in' })
  @Post('/login')
  @ApiConsumes('application/x-www-form-urlencoded')
  async signIn(@Body() dto: signInClientDTO) {
    const user = await this.authService.validateUser(dto.email, dto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logs the user out' })
  logout() {
    return { message: 'Logged out successfully' };
  }
}
