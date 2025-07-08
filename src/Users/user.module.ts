import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./UserSchema";
import { usersService } from "./User.service";
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserController } from "./User.controller";

@Module({
  controllers: [UserController],
  providers: [usersService],
  exports: [usersService],
  imports: [
    ConfigModule, // لازم تستورده هنا علشان تقدر تستخدم ConfigService

    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),

    JwtModule.registerAsync({
      imports: [ConfigModule], // ضروري
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
})
export class UserModule {}
