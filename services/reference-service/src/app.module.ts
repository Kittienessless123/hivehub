import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesModule } from './countries/countries.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { SkillsModule } from './skills/skills.module';
import { CategoriesModule } from './categories/categories.module';
import { LanguagesModule } from './languages/languages.module';

@Module({
  imports: [CountriesModule, CurrenciesModule, SkillsModule, CategoriesModule, LanguagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
