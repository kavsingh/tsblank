import { render, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';

import { defaultTheme } from '~/style/theme';

import Count from './count';

const setup = (props: Parameters<typeof Count>[0] = {}) =>
  render(
    <ThemeProvider theme={defaultTheme}>
      <Count {...props} />
    </ThemeProvider>,
  );

describe('Count test', () => {
  it('renders without crashing', () => {
    const { getByTestId } = setup();

    expect(getByTestId('button-decrement').textContent).toBe('-');
    expect(getByTestId('display-count').textContent).toBe('00');
    expect(getByTestId('button-increment').textContent).toBe('+');
  });

  it('updates', async () => {
    const { getByTestId } = setup({ initialCount: 2 });

    expect(getByTestId('display-count').textContent).toBe('02');

    fireEvent.click(getByTestId('button-increment'));

    await waitFor(() => {
      expect(getByTestId('display-count').textContent).toBe('03');
    });

    fireEvent.click(getByTestId('button-decrement'));
    fireEvent.click(getByTestId('button-decrement'));

    await waitFor(() => {
      expect(getByTestId('display-count').textContent).toBe('01');
    });
  });
});
