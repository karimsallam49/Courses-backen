import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CoursesDocument } from "./CourseSschema";
import { addCourseDTO, UpdateCourseDTO } from "src/DTO/DTO";
import { skip } from "rxjs";

@Injectable()

export class CoursesService{

    constructor(
        @InjectModel('Courses')private readonly CoursesModel:Model<CoursesDocument>
    ){}


    public async GetAllCoursesMethod(reviewperPage?:number,pageNumber?:number){

        return await this.CoursesModel.find().skip(((pageNumber ?? 1) - 1) * (reviewperPage ?? 10))
      .limit(reviewperPage??0);
    }

    public async GetCourseById(id:any){

        return await this.CoursesModel.findById(id)
    }

    async getCoursesByName(name:string){
return await this.CoursesModel.find({
  Title: { $regex: name, $options: 'i' }
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
}