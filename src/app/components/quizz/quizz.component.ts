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

  playerChoose(value: string): void {
    this.answers.push(value);

    this.nextQuestion();
  }

  async nextQuestion() {
    this.questionIndex += 1;

    this.finished = !(this.questionMaxIndex > this.questionIndex);

    if (!this.finished) {
      this.questionSeletcted = this.questions[this.questionIndex];
    } else {
      const finalAnswer = await this.checkResult(this.answers);

      this.answersSelected =
        quizz_questions.results[
          finalAnswer as keyof typeof quizz_questions.results
        ];
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
      ) {
        return previous;
      }
      return current;
    });

    return result;
  }
}
