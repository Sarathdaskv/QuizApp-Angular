import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminLoginComponent } from '../login/admin-login/admin-login.component';
import { AdminService } from '../service/admin.service';
import { Question } from '../question.model';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  adminId!: string;
  userData!: any
  allQuestionData: any;

  question: Question = {
    questionText: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: 0
  };
  option1!: string;
  option2!: string;
  option3!: string;
  option4!: string;

  answerIndex!: number

  constructor(private route: ActivatedRoute, private auth: AdminService, private routing: Router, private questionService: QuestionService) { }


  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.adminId = data['adminId'];
    })
    this.auth.getLoginAdminData(this.adminId).subscribe(data => {
      this.userData = data;
    }
    )
    this.questionService.getQuestions(this.adminId).subscribe(questions => {
      this.allQuestionData = questions;
      console.log("ewf", this.allQuestionData);
    });


  }


  submitForm() {
    this.question.option1 = this.option1
    this.question.option2 = this.option2
    this.question.option3 = this.option3
    this.question.option4 = this.option4
    this.question.correctAnswer = this.answerIndex;
    this.questionService.addQuestion(this.question);
    this.question = {
      questionText: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: 0
    };
    this.option1 = '';
    this.option2 = '';
    this.option3 = '';
    this.option4 = '';
    this.answerIndex = 0;

  }

  logOut() {
    this.auth.logOut()
  }

}
