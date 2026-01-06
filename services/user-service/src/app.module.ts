import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { EducationsModule } from './educations/educations.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ProfilesModule,
    ExperiencesModule,
    EducationsModule,
    ConfigModule.forRoot({
      isGlobal: true, // Доступен во всех модулях
      envFilePath: '.env', // Ищет .env файл
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
