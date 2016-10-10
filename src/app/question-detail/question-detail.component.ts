import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Question, Choice} from "../shared/question";
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from "@angular/forms";
import {QuestionsService} from "../shared/questions.service";

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
    this.questionsService.updateQuestion(this.question.id, data)
      .subscribe(() => this.router.navigate(['']));
  }

  defineDividerColor(control: FormControl): string {
    return control.valid ? 'primary' : 'warn';
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }
}
