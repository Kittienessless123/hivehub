import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('📝 Register attempt:', body.email);

    return {
      success: true,
      message: 'User registered successfully (stub)',
      userId: 'stub-user-id-123',
      timestamp: new Date().toISOString(),
    };
  }

  // POST /auth/login
  @Post('login')
  @HttpCode(HttpStatus.OK) // Статус 200
  login(@Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('🔑 Login attempt:', body.email);

    return {
      success: true,
      message: 'Login successful (stub)',
      accessToken: 'stub-jwt-token-here',
      refreshToken: 'stub-refresh-token-here',
    };
  }

  // GET /auth/me (получить текущего пользователя)
  @Get('me')
  getCurrentUser() {
    return {
      success: true,
      user: {
        id: 'stub-user-id',
        email: 'stub@example.com',
        name: 'Stub User',
      },
    };
  }

  // POST /auth/logout
  @Post('logout')
  logout() {
    return {
      success: true,
      message: 'Logged out successfully (stub)',
    };
  }

  // GET /auth/health
  @Get('health')
  health() {
    return {
      status: 'ok',
      service: 'auth',
      timestamp: new Date().toISOString(),
    };
  }
}
