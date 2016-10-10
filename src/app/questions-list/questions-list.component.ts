import {Component, ChangeDetectorRef} from '@angular/core';
import {QuestionsService} from "../shared/questions.service";
import {Question} from "../shared/question";
import {Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent {

  questions: Question[];
  publishedFilter = '';

  constructor(private questionsService: QuestionsService, private router: Router, private authService: AuthService, private ref: ChangeDetectorRef) {
  }

  getQuestions() {
    this.questionsService.getQuestions(this.publishedFilter)
      .subscribe(questions => {
        this.questions = questions;
        this.ref.detectChanges();
      });
  }

  changeQuestionVisiblity(question: Question) {
    this.questionsService.changeQuestionVisibility(question)
      .subscribe(res => {
        if (res.ok) {
          question.published = !question.published;
        }
      });
  }

  goToQuestionDetail(question: Question) {
    this.router.navigate(['/questions', question.id]);
  }

  get isAdmin() {
    return this.authService.isAdmin;
  }

}
