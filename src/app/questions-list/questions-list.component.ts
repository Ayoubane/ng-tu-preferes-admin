import {Component, OnInit} from '@angular/core';
import {QuestionsService} from "../shared/questions.service";
import {Question} from "../shared/question";
import {MdRadioButton} from "@angular/material";

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  questions: Question[];
  publishedFilter: any;

  constructor(private questionsService: QuestionsService) {
  }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions(published = '') {
    this.questionsService.getQuestions(published)
      .subscribe(questions => this.questions = questions);
  }

  updatePublishedFilter(event: MdRadioButton) {
    this.getQuestions(event.value);
  }

}
