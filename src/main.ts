import './polyfills.ts';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {environment} from './environments/environment';
import {AppModule} from './app/';

declare var gapi: any;

if (environment.production) {
  enableProdMode();
}

gapi.load('auth2', () => {
  platformBrowserDynamic().bootstrapModule(AppModule);
});
