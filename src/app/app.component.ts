import {Component, AfterViewInit, OnInit, ChangeDetectorRef} from '@angular/core';
import {AuthService} from "./shared/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  private user: any;

  constructor(private ref: ChangeDetectorRef, private authService: AuthService) {
  }

  ngAfterViewInit(): void {
    this.authService.userSign.subscribe(u => {
      this.user = u;
      this.ref.detectChanges();
    });
  }

  signIn() {
    this.authService.signIn();
  }

  signOut() {
    this.authService.signOut();
  }

  get userAvatarUrl() {
    return this.user.getBasicProfile().getImageUrl();
  }

}
