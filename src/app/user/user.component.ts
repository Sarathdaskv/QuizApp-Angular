import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userId!: string;
  userData!: any
  questions!: any;
  currentQuestionIndex: number = 0;
  score: number = 0;


  constructor(private route: ActivatedRoute, private auth: AuthServiceService, private routing: Router, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.userId = data['userId'];
    })
    this.auth.getLoginUserData(this.userId).subscribe(data => {
      this.userData = data;
    }
    )
    this.questionService.getRandomQuestions().subscribe(data => {
      this.questions = data;
    })
  }


  logOut() {
    this.auth.logOut()
  }

  answerSelected(isCorrect: boolean): void {
    if (isCorrect) {
      this.score++;
    }

    this.currentQuestionIndex++;

    // Check if there are more questions or show the result
    if (this.currentQuestionIndex === 10) {
      
      
    }
  }

}
