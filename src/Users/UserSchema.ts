import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserType {
  Normal_User = 'Normal_user',
  Admin = 'Admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  VerificationToken: string;
  @Prop()
  accessToken?: string;

  @Prop({ default: false })
  iSconfiremnt: boolean;

  @Prop({ enum: UserType, default: UserType.Normal_User })
  UserType: UserType;

  @Prop()
  Profileiamge: string;

  @Prop()
  Courses:[]
}

export const UserSchema = SchemaFactory.createForClass(User);
