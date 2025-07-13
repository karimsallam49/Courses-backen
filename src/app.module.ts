import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './Users/user.module';
import { CoursesModule } from './Courses/Courses.module';
import { CardModule } from './Cards/Cards.Module';
import { AiModule } from './Ai-integration/Ai.Modules';
import { DashboardModule } from './Dashboard/Dashboard.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }), 
      ConfigModule.forRoot({
      isGlobal: true, // علشان تبقى متاحة في كل المشروع
      envFilePath: '.env',
    }),

    UserModule,
    CoursesModule,
    CardModule,
    AiModule,
    DashboardModule
  ],
})
export class AppModule {}
