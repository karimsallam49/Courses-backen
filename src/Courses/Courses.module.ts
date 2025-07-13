import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CoursesShema } from "./CourseSschema";
import { CoursesService } from "./Courses.Service";
import { CoursesController } from "./Courses.Controller";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/Users/user.module";
import { UserSchema } from "src/Users/UserSchema";

@Module({
    controllers:[CoursesController],
    providers:[CoursesService],
     imports:[
        MongooseModule.forFeature([{ name: 'Courses', schema: CoursesShema }]),

        JwtModule,
        UserModule
    
]
})

export class CoursesModule{}