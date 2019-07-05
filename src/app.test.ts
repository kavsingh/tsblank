import { app } from './app';

describe('app test', () => {
  it('initializes app', () => {
    const appRoot = document.createElement('div');

    app(appRoot);

    expect(appRoot.innerHTML).toBe('hello');
  });
});
