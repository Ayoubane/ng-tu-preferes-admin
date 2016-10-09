import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, XHRBackend, Http, RequestOptions} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {RouterModule} from "@angular/router";

import {AppComponent} from './app.component';
import {QuestionsListComponent} from './questions-list/questions-list.component';
import {QuestionsService, AuthService} from './shared';
import {QuestionDetailComponent} from './question-detail/question-detail.component';
import {QuestionDetailResolver} from "./question-detail/question-detail-resolver";

@NgModule({
  declarations: [
    AppComponent,
    QuestionsListComponent,
    QuestionDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: QuestionsListComponent
      },
      {
        path: 'questions/:id',
        component: QuestionDetailComponent,
        resolve: {
          question: QuestionDetailResolver
        }
      }
    ])
  ],
  providers: [
    QuestionsService,
    AuthService,
    QuestionDetailResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
