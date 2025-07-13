import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {   OpenAI } from 'openai';
import { UserDocument } from 'src/Users/UserSchema';

@Injectable()

export class AiServices{
      private openai: OpenAI;

    constructor(
                @InjectModel('User')private readonly UserModel:Model<UserDocument>
        
    ){
            this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, 
    });
    }

     async suggestCoursesBasedOnHistory(userid: string) {

        const Currentuser=await this.UserModel.findById(userid)
        if(!Currentuser) return
        const userHistory=Currentuser?.SearchHistory
    const prompt = `Suggest 3 online courses based on the following topics: ${userHistory.join(', ')}`;

    const res = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    return res.choices[0].message.content;
  }
 async generateCourseDescription(title: string) {
    const prompt = `Write a professional course description for a course titled "${title}"`;

    const res = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    return res.choices[0].message.content;
  }
}