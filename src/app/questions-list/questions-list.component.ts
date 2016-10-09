import {Component} from '@angular/core';
import {QuestionsService} from "../shared/questions.service";
import {Question} from "../shared/question";

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent {

  questions: Question[];
  publishedFilter = '';

  constructor(private questionsService: QuestionsService) {
  }

  getQuestions() {
    this.questionsService.getQuestions(this.publishedFilter)
      .subscribe(questions => this.questions = questions.map(q => QuestionsListComponent.computeClassName(q)));
  }

  changeQuestionVisiblity(question: Question) {
    this.questionsService.changeQuestionVisibility(question)
      .subscribe(res => {
        if (res.ok) {
          question.published = !question.published;
          QuestionsListComponent.computeClassName(question);
        }
      });
  }

  static computeClassName(q: Question): Question {
    q.className = q.published ? 'published' : 'unpublished';
    return q;
  }

}
