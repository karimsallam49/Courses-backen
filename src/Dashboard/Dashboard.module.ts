import { Module } from "@nestjs/common";
import { CoursesModule } from "src/Courses/Courses.module";
import { UserModule } from "src/Users/user.module";
import { DashboardService } from "./Dashboard.Service";
import { DashboardController } from "./Dashboard.Countroller";

@Module({
imports:[UserModule,CoursesModule],
providers:[DashboardService],
controllers:[DashboardController]

})

export class DashboardModule{}