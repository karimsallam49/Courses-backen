import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { cardsServices } from "./Cards.services";
import { AuthGuard } from "src/Garuds/AuthGarud";
import { GetCurrentUserDecorator } from "src/Decorators/GetCurrentUserDecorators";

@Controller()
export class CardsController{
    constructor(
        private readonly Cardservices:cardsServices
    ){}

    @Get("/api/card/fullquantity")
    @UseGuards(AuthGuard)
    public GetFullquantity(@GetCurrentUserDecorator() payload:any){
        return this.Cardservices.GetCardQuatity(payload.id)
    }

    @Get("/api/card/getAllCard")
    @UseGuards(AuthGuard)
    public GetAllCArd(@GetCurrentUserDecorator() payload:any){

        return this.Cardservices.GetAllCart(payload.id)
    }
    @Post("/api/card/addToCard/:courseid")
    @UseGuards(AuthGuard)
    public AddToCard(@GetCurrentUserDecorator() payload:any,@Param("courseid") courseid :string ){

        return this.Cardservices.addCourseToCart(payload.id,courseid)
    }
    @Get("/api/card/RemoveFromCard/:courseid")
    @UseGuards(AuthGuard)
    public RemoveFromCard(@GetCurrentUserDecorator() payload:any,@Param("courseid") courseid :string ){

        return this.Cardservices.removeCoursesFromCard(payload.id,courseid)
    }



}