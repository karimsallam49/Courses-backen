import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CartSchema } from "./CardSchema";
import { UserModule } from "src/Users/user.module";
import { CardsController } from "./Cards.Controller";
import { cardsServices } from "./Cards.services";
import { JwtModule } from "@nestjs/jwt";

@Module({

    imports:[
        MongooseModule.forFeature([{name:'Cart',schema:CartSchema}]),
        UserModule,
        JwtModule
    ],
    controllers:[CardsController],
    providers:[cardsServices]

})
export class CardModule{}