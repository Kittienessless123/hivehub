// services/auth-service/src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Создаем пул соединений PostgreSQL
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    // Создаем адаптер
    const adapter = new PrismaPg(pool);

    super({
      adapter: adapter, // ← передаем адаптер
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
