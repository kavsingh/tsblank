import { screen } from '@testing-library/dom';

import app from './app';

describe('app test', () => {
  beforeEach(() => {
    Array.from(document.body.children).forEach((el) => {
      document.body.removeChild(el);
    });
  });

  it('initializes app', () => {
    const root = document.createElement('div');

    document.body.appendChild(root);
    app(root);

    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('throws if no root', () => {
    expect(() => app(null)).toThrow('Could not find root element');
    expect(screen.queryByText('hello')).not.toBeInTheDocument();
  });
});
