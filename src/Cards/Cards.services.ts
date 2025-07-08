import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CartDocument } from "./CardSchema";

@Injectable()
export class cardsServices{
    constructor(
                @InjectModel('Cart') private readonly  CartModel:Model<CartDocument>

    ){}


    public async GetCardQuatity(userId: string){
        const userObjectId = new Types.ObjectId(userId);
        let cart=await this.CartModel.findOne({userId:userObjectId})
        
        if(!cart) {
            return {
                quantity:0
            }
        }else{

            const currentquantity=cart.courses.length

            return{
                quantity:currentquantity
            }
        }

    }

      async addCourseToCart(userId: string, courseId: string) {
    const userObjectId = new Types.ObjectId(userId);
    const courseObjectId = new Types.ObjectId(courseId);

   
    let cart = await this.CartModel.findOne({ userId: userObjectId });

    if (!cart) {
     
      cart = await this.CartModel.create({
        userId: userObjectId,
        courses: [courseObjectId],
      });
    } else {
      
      const isAlreadyAdded = cart.courses.some(
        (c) => c.toString() === courseId
      );

      if (isAlreadyAdded) {
        throw new BadRequestException('Course already in cart');
      }


      cart.courses.push(courseObjectId);
      await cart.save();
    }

    return cart;
  }


  async removeCoursesFromCard(userId: string, courseId: string){

    const userObjectId = new Types.ObjectId(userId);
   
    let cart = await this.CartModel.findOne({ userId: userObjectId });

    if(!cart) throw new BadRequestException("there is no cart for this user")
         const Iscourseexist = cart.courses.some(
        (c) => c.toString() === courseId
      );

      if(!Iscourseexist) throw new BadRequestException("This Course is not exist")
        cart.courses=  cart.courses.filter((el)=>el.toString()!=courseId)

     await cart.save()

     return {
        Message:"the course deleted succefully"
     }

     
     
     
    }
    async GetAllCart(userId:string){
    const userObjectId = new Types.ObjectId(userId);
   
    let cart = await this.CartModel.findOne({ userId: userObjectId });
    if(!cart) throw new BadRequestException("there is no cart for this user")
     const courses=cart.courses

    return courses
        

    }
}