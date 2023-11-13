import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() question: any;
  @Input() isActive!: boolean;
  @Output() answerSelected = new EventEmitter<boolean>();

  selectedAnswer!: string;

  submitAnswer(): void {
    const isCorrect = this.selectedAnswer == this.question.correctAnswer;
    this.answerSelected.emit(isCorrect);
  }
}
