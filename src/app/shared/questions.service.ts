import {Injectable} from '@angular/core';
import {Response, Http, RequestOptionsArgs} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import {Question} from './question';
import {AuthService} from "./auth.service";

@Injectable()
export class QuestionsService {

  private apiUrl = 'https://tu-preferes-1330.appspot.com';

  constructor(private http: Http, private authService: AuthService) {
  }

  public getQuestions(published = ''): Observable<Question[]> {
    return this.http.get(`${this.apiUrl}/api/questions?published=${published}`)
      .map(res => res.json());
  }

  changeQuestionVisibility(question: Question): Observable<Response> {
    let options = this.authService.provideRequestOption();
    return this.http.patch(`${this.apiUrl}/api/questions/${question.id}`, {published: !question.published}, options);
  }
}
