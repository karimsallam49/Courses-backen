import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument, UserType } from "./UserSchema";
import { LoginType, RegsiturType } from "src/DTO/DTO";
import * as  bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class usersService{

    constructor(
      @InjectModel('User') private readonly userModel:Model<UserDocument>,
               private readonly jwtservice:JwtService,


    ){}


    public GetAllusersMethod(){
        return this.userModel.find()
    }


    public async GetCuurentUserMethod(id:any){

        // const Currentuser= await this.users.findOne(({where:{id}}))
        // console.log(Currentuser);
        
        // return Currentuser
          const user = await this.userModel.findById(id);
    return user;
    }

    public async RegisturMethod (Body:RegsiturType){
        const{username,password,email,UserType}=Body
         const userFromDB = await this.userModel.findOne({ email });
    if (userFromDB) throw new BadRequestException('User already exists');
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const NewUser= new this.userModel({
        username,
        email,
        password:hashedPassword,
        UserType
    })

    await NewUser.save()
    return NewUser.toObject();
    }


    public async LoginMethod(LoginBody:LoginType){

        const {email,password}=LoginBody
         const currentuser= await this.userModel.findOne({email})

         if(!currentuser){
            throw new BadRequestException('User Not exist');
         }

         const isPasswordMatch= await bcrypt.compare(password,currentuser.password)
             if (!isPasswordMatch) throw new BadRequestException('Invalid Email or Password');
             const accessToken=await this.generateJWT({
                id:currentuser._id,
                UserType:currentuser.UserType
             })
             currentuser.accessToken=accessToken

             await currentuser.save()

             return currentuser

    }

     private generateJWT(payload:any):Promise<string>{

        return this.jwtservice.signAsync(payload)
    }

}