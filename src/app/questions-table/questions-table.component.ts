import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Question } from '../question.model'; 
import { QuestionService } from '../service/question.service';


@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrls: ['./questions-table.component.css']
})
export class QuestionsTableComponent  {

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['questions']) {
      this.dataSource = changes['questions'].currentValue;
    }
  }
  @Input() questions!:any
  @Input() adminId!:string
  displayedColumns: string[] = ['questionText', 'option1', 'option2', 'option3', 'option4', 'correctAnswer'];
  dataSource = this.questions;
}
