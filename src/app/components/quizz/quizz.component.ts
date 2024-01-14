import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../data/quizz_questions.json';
import { Question } from './quizz.types';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  title: string = '';

  questions: Question[] = [];

  questionSeletcted: Question = {
    id: 0,
    question: '',
    options: [{ id: 0, name: '', alias: '' }],
  };

  answers: string[] = [];
  answersSelected: string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSeletcted = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }
}
