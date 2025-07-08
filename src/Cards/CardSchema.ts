import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop([
    {
      type: Types.ObjectId,
      ref: 'Courses',
    },
  ])
  courses: Types.ObjectId[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
