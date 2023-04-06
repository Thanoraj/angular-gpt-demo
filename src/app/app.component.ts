import { Component } from '@angular/core';
//import openai from 'openai';
import { HttpClient } from '@angular/common/http';
//import { OpenAIApi, Configuration } from "openai";
import * as openai from "openai";
import {environment} from "src/app/secret";

@Component({
  selector: 'app-mcq-quiz',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  topic: string = '';
  rating: number = 0;
  response: string='any';
  error: string='any';
  configuration: any;
  text: string ='';


  //constructor(private http: HttpClient) { }

  async submitForm() {
    const prompt = "Generate " + this.rating + " multiple choice questions and answers in the topic of " + this.topic+ " in the json format";

    const { Configuration, OpenAIApi } = require("openai");

    this.configuration = new Configuration({
      apiKey: environment.apiKey,
    });

    const openai = new OpenAIApi(this.configuration);

    //const url = 'https://api.openai.com/v1/engines/text-davinci-002/completions';

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 1040,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      //stop: ["\n"],
    });
    this.text = response.data.choices[0].text;
    console.log(this.text);
    return this.text;
    //console.log(response);

  }
}
