import {Injectable, EventEmitter} from '@angular/core';
import {environment} from '../../environments/environment';
import {RequestOptionsArgs, Headers} from "@angular/http";

declare var gapi: any;

@Injectable()
export class AuthService {

  private user: any;
  private authClient: any;
  public userSign: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.authClient = gapi.auth2.init({
      client_id: environment.googleClientId
    });

    this.authClient.currentUser.listen(u => {
      this.user = this.authClient.isSignedIn.get() ? u : null;
      this.userSign.emit(this.user);
    });
  }

  signIn() {
    this.authClient.signIn({
      prompt: 'select_account'
    });
  }

  signOut() {
    this.authClient.signOut();
  }

  provideRequestOption(): RequestOptionsArgs {
    return {
      headers: new Headers({
        'Authorization': this.buildToken()
      })
    };
  }

  private buildToken(): string {
    if (!this.user) {
      return '';
    }
    return `Bearer ${this.user.Zi.access_token}`;
  }

}
