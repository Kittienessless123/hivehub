import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { EducationsModule } from './educations/educations.module';

@Module({
  imports: [UsersModule, ProfilesModule, ExperiencesModule, EducationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
