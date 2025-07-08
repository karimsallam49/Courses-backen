import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { CURRENT_USER_KEY } from "src/utilites/utilites";


@Injectable()
export class AuthGuard implements CanActivate{
    constructor( 
        private readonly JWTsrevice:JwtService,
            private readonly configService: ConfigService,
        
    ){}
   async canActivate(context: ExecutionContext) {
    const request:Request=context.switchToHttp().getRequest()
    const token = request.headers.authorization?.replace(/^Bearer\s/, "") ?? "";



  if(token){
            try {
                
            const payload = await this.JWTsrevice.verifyAsync(token, { secret:this.configService.get<string>("JWT_SECRET") });

                request[CURRENT_USER_KEY]=payload
                // return true

            } catch (error) {
                throw new UnauthorizedException("accses denied ,invalid token")
            }
        }else{
                throw new UnauthorizedException("accses denied ,token required")
        }
        return true
        }
    
}