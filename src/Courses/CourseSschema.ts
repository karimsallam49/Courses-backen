import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type CoursesDocument = Courses & Document;


@Schema({ timestamps: true })
export class Courses {
  @Prop({ required: true })
  Title: string;

  @Prop({ required: true})
  Price: number;

  @Prop()
  Link: string;

  @Prop({ default: false })
  iSEnrolled: boolean;

  @Prop()
  Cover: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  Users:Types.ObjectId[];
}

export const CoursesShema = SchemaFactory.createForClass(Courses);
