import { SetMetadata } from "@nestjs/common";
import { UserType } from "src/utilites/utilites";

export const role=(...roles:UserType[])=>SetMetadata('roles',roles)