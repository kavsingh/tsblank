import { describe, beforeEach, it, expect } from 'vitest';
import { screen } from '@testing-library/dom';

import app from './app';

describe('App', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should initialize', () => {
    const root = document.body.appendChild(document.createElement('div'));

    app(root);

    expect(screen.getByText('hello')).toBeTruthy();
  });

  it('should throw if root element is not found', () => {
    expect(() => app(null)).toThrow('Could not find root element');
    expect(screen.queryByText('hello')).toBeFalsy();
  });
});
