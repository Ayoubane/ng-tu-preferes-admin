import { NgTuPreferesAdminPage } from './app.po';

describe('ng-tu-preferes-admin App', function() {
  let page: NgTuPreferesAdminPage;

  beforeEach(() => {
    page = new NgTuPreferesAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
