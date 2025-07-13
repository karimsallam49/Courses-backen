import { Controller, Get, UseGuards } from "@nestjs/common";
import { AiServices } from "./AI.services";
import { AuthGuard } from "src/Garuds/AuthGarud";
import { GetCurrentUserDecorator } from "src/Decorators/GetCurrentUserDecorators";

@Controller()
export class AiController{
    constructor(
        private readonly AiService:AiServices
    ){}

    @Get("/api/ai/userSuggest")
    @UseGuards(AuthGuard)
    public GetUserSuggest(@GetCurrentUserDecorator() payload:any){
        return this.AiService.suggestCoursesBasedOnHistory(payload.id)
    }
}