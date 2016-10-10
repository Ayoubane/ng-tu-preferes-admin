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

  public getQuestionDetail(id: string): Observable<Question> {
    return this.http.get(`${this.apiUrl}/api/questions/${id}`)
      .map(res => res.json());
  }

  public changeQuestionVisibility(question: Question): Observable<Response> {
    return this.http.patch(`${this.apiUrl}/api/questions/${question.id}`, {published: !question.published}, this._options);
  }

  public updateQuestion(questionId: string, data: any): Observable<Response> {
    return this.http.patch(`${this.apiUrl}/api/questions/${questionId}`, data, this._options);
  }

  postNewQuestion(data: any): Observable<Response> {
    return this.http.post(`${this.apiUrl}/api/questions`, data, this._options);
  }

  get _options() {
    return this.authService.provideRequestOption();
  }

}
