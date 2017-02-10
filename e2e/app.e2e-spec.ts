import { TpostPage } from './app.po';

describe('tpost App', function() {
  let page: TpostPage;

  beforeEach(() => {
    page = new TpostPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
