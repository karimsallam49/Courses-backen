export class RegsiturType{
    username:string
    password:string;
    email:string;
    UserType?:string

}

export class LoginType{
    email:string
    password:string
}

export class addCourseDTO{
    title:string;
    price:number;
    link:string;
    cover:string
}
export class UpdateCourseDTO{
    title?:string;
    price?:number;
    link?:string;
    cover?:string
}