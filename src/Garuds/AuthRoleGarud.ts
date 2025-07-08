import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { usersService } from "src/Users/User.service";
import { CURRENT_USER_KEY, UserType } from "src/utilites/utilites";


@Injectable()
export class AuthRoleGuard implements CanActivate{
    constructor( 
        private readonly JWTsrevice:JwtService,
        private readonly configService: ConfigService,
        private readonly reflector:Reflector,
        private readonly usersServices:usersService


        
    ){}
   async canActivate(context: ExecutionContext) {
    const request:Request=context.switchToHttp().getRequest()
    const token = request.headers.authorization?.replace(/^Bearer\s/, "") ?? "";
       const roles:UserType[]= this.reflector.getAllAndOverride('roles',[context.getHandler(),context.getClass()])
              if(!roles) return false



  if(token){
            try {
                
            const payload = await this.JWTsrevice.verifyAsync(token, { secret:this.configService.get<string>("JWT_SECRET") });

   const user= await this.usersServices.GetCuurentUserMethod(payload.id)
                if(!user)return false
                 if (roles.includes(user?.UserType ?? UserType.Normal_User)) {
                request[CURRENT_USER_KEY]=payload
                return true
                }                

            } catch (error) {
                throw new UnauthorizedException("accses denied ,invalid token")
            }
        }else{
                throw new UnauthorizedException("accses denied ,token required")
        }
        return true
        }
    
}