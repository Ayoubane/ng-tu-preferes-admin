import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Question, Choice} from "../shared/question";
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from "@angular/forms";
import {QuestionsService} from "../shared/questions.service";
import * as slug from 'slug';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {

  question: Question;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private questionsService: QuestionsService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.forEach((data: { question: Question }) => {
      this.question = data.question;
    });

    this.form = this.fb.group({
      content: [this.question.content, Validators.required],
      published: this.question.published,
      choices: this.fb.array(
        this.question.choices.map(c => this.buildChoiceControl(c))
      )
    });
  }

  get choices(): FormArray {
    return this.form.get('choices') as FormArray;
  }

  addChoice() {
    this.choices.push(this.buildChoiceControl());
  }

  buildChoiceControl(c: Choice|any = {}): FormGroup {
    return this.fb.group({
      content: [c.content, Validators.required],
      content_short: [c.content_short, Validators.required],
      slug: [c.slug, Validators.pattern('[0-9a-z\-]+')]
    });
  }

  saveQuestion() {
    let data = this.form.getRawValue();
    let obs;
    if (this.question.id) {
      obs = this.questionsService.updateQuestion(this.question.id, data)
    } else {
      obs = this.questionsService.postNewQuestion(data);
    }
    obs.subscribe(() => this.router.navigate(['']));
  }

  defineDividerColor(control: FormControl): string {
    return control.valid ? 'primary' : 'warn';
  }

  get newQuestion(): boolean {
    return !!this.question.id;
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

  generateSlugForChoice(control: FormControl) {
    let contentShort = control.get('content_short').value;
    //noinspection TypeScriptUnresolvedVariable
    control.get('slug').setValue(slug(contentShort, slug.defaults.modes["rfc3986"]));
  }
}
