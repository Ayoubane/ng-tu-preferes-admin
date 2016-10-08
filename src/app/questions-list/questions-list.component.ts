import {Component, OnInit} from '@angular/core';
import {QuestionsService} from "../shared/questions.service";
import {Question} from "../shared/question";

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  questions: Question[];

  constructor(private questionsService: QuestionsService) {
  }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.questionsService.getQuestions()
      .subscribe(questions => this.questions = questions);
  }

}
