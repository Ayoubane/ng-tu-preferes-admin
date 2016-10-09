import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import {Question} from './question';

@Injectable()
export class QuestionsService {

  private questionsUrl = 'https://tu-preferes-1330.appspot.com/api/questions';

  constructor(private http: Http) {
  }

  public getQuestions(published = ''): Observable<Question[]> {
    return this.http.get(`${this.questionsUrl}?published=${published}`)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    return res.json() || [];
  }
}
