import { screen } from '@testing-library/dom';

import app from './app';

describe('app test', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('initializes app', () => {
    const root = document.body.appendChild(document.createElement('div'));

    app(root);

    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('throws if no root', () => {
    expect(() => app(null)).toThrow('Could not find root element');
    expect(screen.queryByText('hello')).not.toBeInTheDocument();
  });
});
