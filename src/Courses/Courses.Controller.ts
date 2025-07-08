import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { CoursesService } from "./Courses.Service";
import { addCourseDTO, UpdateCourseDTO } from "src/DTO/DTO";
import { AuthRoleGuard } from "src/Garuds/AuthRoleGarud";
import { role } from "src/Decorators/GetUserRole";
import { UserType } from "src/utilites/utilites";

@Controller()
export class CoursesController{

    constructor(
        private readonly CoursesService:CoursesService
    ){}

 @Get("/api/Courses/GetallCourses")
public GetAllCourses(
  @Query('page') page: number,
  @Query('limit') limit: number
) {
  return this.CoursesService.GetAllCoursesMethod(+limit, +page);
}


@Get("/api/Courses/GetCourse/:id")
public GetCoursesById(@Param('id') id:any){

    return this.CoursesService.GetCourseById(id)
}

@Post("/api/Courses/addCourse")
@UseGuards(AuthRoleGuard)
@role(UserType.Admin)
public addCourse(@Body() body:addCourseDTO){

    return this.CoursesService.addCourse(body)
}

@Get("/api/Courses/deleteCourse/:id")
@UseGuards(AuthRoleGuard)
@role(UserType.Admin)
public deleteCourse (@Param('id') id:any){
    return this.CoursesService.DeleteCourse(id)
}
@Post("/api/Courses/UpdateCourse/:id")
@UseGuards(AuthRoleGuard)
@role(UserType.Admin)

public UpdateCourse(@Param('id') id:any,@Body() body:UpdateCourseDTO){
    return this.CoursesService.UpdateCourse(id,body)
}
}