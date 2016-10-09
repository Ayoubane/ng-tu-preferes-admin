import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Question} from "../shared/question";
import {Observable} from "rxjs";
import {QuestionsService} from "../shared/questions.service";

@Injectable()
export class QuestionDetailResolver implements Resolve<Question> {

  constructor(private questionsService: QuestionsService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Question> {
    return this.questionsService.getQuestionDetail(route.params['id']);
  }
}
