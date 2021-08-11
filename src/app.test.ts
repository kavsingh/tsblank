import { screen } from '@testing-library/dom';

import app from './app';

describe('app test', () => {
  it('initializes app', () => {
    app(document.createElement('div'));

    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('throws if no root', () => {
    expect(() => app(null)).toThrow('Could not find root element');
    expect(screen.queryByText('hello')).not.toBeInTheDocument();
  });
});
