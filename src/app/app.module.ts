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
import {AuthGuard} from "./shared/auth-guard.service";

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
        },
        canActivate: [AuthGuard]
      }
    ])
  ],
  providers: [
    QuestionsService,
    AuthService,
    QuestionDetailResolver,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
