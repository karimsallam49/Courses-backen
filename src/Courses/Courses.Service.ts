import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types,Schema } from "mongoose";
import { CoursesDocument } from "./CourseSschema";
import { addCourseDTO, UpdateCourseDTO } from "src/DTO/DTO";
import { UserDocument } from "src/Users/UserSchema";

@Injectable()

export class CoursesService{

    constructor(
        @InjectModel('Courses')private readonly CoursesModel:Model<CoursesDocument>,
        @InjectModel('User')private readonly UserModel:Model<UserDocument>
    ){}


    public async GetAllCoursesMethod(reviewperPage?:number,pageNumber?:number){

        return await this.CoursesModel.find().skip(((pageNumber ?? 1) - 1) * (reviewperPage ?? 10))
      .limit(reviewperPage??0);
    }

    public async GetCourseById(id:any){

        return await this.CoursesModel.findById(id)
    }

 async getCoursesByName(name: string, userId?: string) {
  if (userId) {
    const currentUser = await this.UserModel.findById(userId);
    if (!currentUser) return;

    currentUser.SearchHistory = currentUser.SearchHistory || [];
    if (!currentUser.SearchHistory.includes(name)) {
      currentUser.SearchHistory.push(name);
      await currentUser.save();
    }
  }

  return await this.CoursesModel.find({
    Title: { $regex: name, $options: 'i' },
  });
}


    public async addCourse(Body:addCourseDTO){
        const{title,price,cover,link}=Body
        const NewCourse=new this.CoursesModel({
            Title:title,
            Price:price,
            Cover:cover,
            Link:link,
            
        })

        await NewCourse.save()
        return NewCourse
    }

    public async DeleteCourse(id:any){
        
        const IsCourseExist=await this.CoursesModel.findById(id)
        if(!IsCourseExist) throw new BadRequestException("This Couese is not exist")


            await this.CoursesModel.findByIdAndDelete(id);

    return {
      message: 'Course deleted successfully',
      deletedCourseId: id,
    };
    }

    public async UpdateCourse(id:any,Body:UpdateCourseDTO){
             const IsCourseExist=await this.CoursesModel.findById(id)
        if(!IsCourseExist) throw new BadRequestException("This Couese is not exist")

            IsCourseExist.Title=Body.title??IsCourseExist.Title
            IsCourseExist.Price=Body.price??  IsCourseExist.Price
            IsCourseExist.Cover=Body.cover??  IsCourseExist.Cover
            IsCourseExist.Link=Body.link??  IsCourseExist.Link

            await IsCourseExist.save()
            return {
                Message:"The Course has updated succssflly",
                IsCourseExist
            }
    }


public async EnrollCourse(Courseid: string, UserId: string) {
  const userObjectId = new Types.ObjectId(UserId);

  const CurrentCourse = await this.CoursesModel.findById(Courseid);
  if (!CurrentCourse) {
    throw new BadRequestException("This course does not exist");
  }

  if (CurrentCourse.Users.map(user => user.toString()).includes(UserId)) {
    throw new BadRequestException("This course is already enrolled");
  }


  CurrentCourse.Users.push(userObjectId);
  await CurrentCourse.save();

  return {
    Message: "Course Added Successfully"
  };
}


}