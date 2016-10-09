import {Injectable, EventEmitter} from '@angular/core';
import {environment} from '../../environments/environment';

declare var gapi: any;

@Injectable()
export class AuthService {

  private authClient: any;
  public userSign: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.authClient = gapi.auth2.init({
      client_id: environment.googleClientId
    });

    this.authClient.currentUser.listen(u => {
      let user = this.authClient.isSignedIn.get() ? u : null;
      this.userSign.emit(user);
    });
  }

  signIn() {
    this.authClient.signIn({prompt: 'select_account'});
  }

  signOut() {
    this.authClient.signOut();
  }

}
