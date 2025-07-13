import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Aggregate, Model } from "mongoose";
import { CartDocument } from "src/Cards/CardSchema";
import { CoursesDocument } from "src/Courses/CourseSschema";
import { UserDocument } from "src/Users/UserSchema";

@Injectable()
export class DashboardService{

    constructor(
              @InjectModel('User') private readonly userModel:Model<UserDocument>,
            @InjectModel('Courses')private readonly CoursesModel:Model<CoursesDocument>,
            @InjectModel('Cart') private readonly  CartModel:Model<CartDocument>
                
        
    ){}


async MostSubscribedCourse() {
  return await this.CoursesModel.aggregate([
    {
      $project: {
        title: 1,
        Users: 1,
        enrolledCount: { $size: "$Users" },
      }
    },
    { $sort: { enrolledCount: -1 } }, 
    { $limit: 1 } 
  ]);
}

async MostSubscribeCourseFromtTop(){

  return await this.CoursesModel.aggregate([
    {
      $project: {
        title: 1,
        Users: 1,
        enrolledCount: { $size: "$Users" }, 
      }
    },
    { $sort: { enrolledCount: -1 } }, 
  ]);
}

async MostSearchedCourse() {
  return await this.userModel.aggregate([
    {
      $project: {
        SearchHistory: 1
      }
    },
    { $unwind: "$SearchHistory" },
   
    {
      $group: {
        _id: "$SearchHistory",
        count: { $sum: 1 }
      }
    },
    
    { $sort: { count: -1 } },


  ]);
}


async NumberOfUsersHaveCourses() {
  const result = await this.CoursesModel.aggregate([
    { $unwind: "$Users" }, 
    {
      $group: {
        _id: "$Users" 
      }
    },
    {
      $count: "TotalUsersWithCourses" 
    }
  ]);

  return result[0]?.TotalUsersWithCourses || 0;
}

async CoursesHasNoEnroll() {
  return await this.CoursesModel.aggregate([
    {
      $match: {
        Users: { $size: 0 }  
      }
    },
    {
      $project: {
        title: 1,
        Users: 1
      }
    }
  ]);
}

async MostUserSearch() {
  return await this.userModel.aggregate([
    {
      $project: {
        username: 1, 
        searchCount: { $size: "$SearchHistory" } 
      }
    },
    {
      $sort: { searchCount: -1 } 
    },
    {
      $limit: 5 
    }
  ]);
}


async GetTheNumberOfCourses(){  

    return await this.CoursesModel.aggregate([
        // {$unwind :{}},
        {

            $project:{
                Users:1,
                 coursesCount: {}

            }
        }
    ])
 }



}