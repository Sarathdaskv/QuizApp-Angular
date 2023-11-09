import { Injectable } from '@angular/core';
import { Question } from '../question.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questions: Question[] = [];

  constructor(private http:HttpClient){}
  addQuestion(question: Question) {
    return this.http.post<any>('http://localhost:3000/admin/question', question).subscribe(response=>{
      console.log(response);
      
    })
  }

  getQuestions(adminId:string){
    return this.http.get<any>(`http://localhost:3000/admin/${adminId}/question`).subscribe(response=>{
      console.log(response);
      
    })
  }

  // getQuestions(): Question[] {
  //  return ;
  // }
}
