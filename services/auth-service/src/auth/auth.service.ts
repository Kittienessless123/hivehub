import { Injectable } from '@nestjs/common';

@Injectable() // Декоратор для Dependency Injection
export class AuthService {
  // Простая заглушка
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register(email: string, password: string) {
    console.log('Service: Registering user', email);
    return {
      id: 'stub-id-' + Date.now(),
      email: email,
      createdAt: new Date(),
    };
  }

  // Простая заглушка для логина
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(email: string, password: string) {
    console.log('Service: Logging in', email);
    return {
      userId: 'stub-user-id',
      accessToken: 'fake-jwt-' + Date.now(),
    };
  }
}
