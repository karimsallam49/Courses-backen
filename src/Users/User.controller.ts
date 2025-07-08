import { Body, Controller, Get, Post } from "@nestjs/common";
import { usersService } from "./User.service";
import { LoginType, RegsiturType } from "src/DTO/DTO";

@Controller()
export class UserController{

    constructor(
        private readonly Userservice:usersService
    ){}


    @Get("allusers")
    public GetallUser(){
        
    }

    @Post("/api/users/registur")
    public Registur(@Body() registureBody:RegsiturType){

        return this.Userservice.RegisturMethod(registureBody)
    }

    @Post("/api/users/login")
    public login(@Body() loginData:LoginType){

        return this.Userservice.LoginMethod(loginData)
    }
}