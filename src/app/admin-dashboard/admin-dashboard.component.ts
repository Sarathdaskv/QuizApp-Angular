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

  question: Question = {
    questionText: '',
    options: [],
    correctAnswer: 0
  };
  options: string = '';


  constructor(private route: ActivatedRoute, private auth: AdminService, private routing: Router, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.adminId = data['adminId'];
    })
    this.auth.getLoginAdminData(this.adminId).subscribe(data => {
      this.userData = data;
    }
    )
  }


  submitForm() {
    this.question.options = this.options.split(',');
    this.questionService.addQuestion(this.question);
    this.question = {
      questionText: '',
      options: [],
      correctAnswer: 0
    };
    this.options = '';
  }

  logOut() {
    this.auth.logOut()
  }

}
