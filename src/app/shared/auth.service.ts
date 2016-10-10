import {Injectable, EventEmitter} from '@angular/core';
import {environment} from '../../environments/environment';
import {RequestOptionsArgs, Headers, Http} from "@angular/http";

declare var gapi: any;

@Injectable()
export class AuthService {

  private user: any;
  private authClient: any;
  public userSign: EventEmitter<any> = new EventEmitter();

  constructor(private http: Http) {
    this.authClient = gapi.auth2.init({
      client_id: environment.googleClientId
    });

    this.authClient.currentUser.listen(u => {
      this.provideUser(u)
        .then(u => this.userSign.emit(u));
    });
  }

  private provideUser(user: any): Promise<any> {
    return new Promise(resolve => {
      this.user = this.authClient.isSignedIn.get() ? user : null;

      if (this.user === null) {
        resolve(this.user);
        return;
      }

      this.http.get(`${environment.apiUrl}/api/is-admin`, this.provideRequestOption())
        .subscribe(res => {
          this.user.admin = res.json();
          resolve(this.user);
        });
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

  get isAdmin(): boolean {
    return this.user && this.user.admin;
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
