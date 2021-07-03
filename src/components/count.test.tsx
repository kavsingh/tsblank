import { createRoot } from 'solid-js';
import { ThemeProvider } from 'solid-styled-components';
import { getByTestId, fireEvent, waitFor } from 'solid-testing-library';

import { defaultTheme } from '~/style/theme';

import Count from './count';

const setup = (props: Parameters<typeof Count>[0] = {}) =>
  (
    <ThemeProvider theme={defaultTheme}>
      <Count {...props} />
    </ThemeProvider>
  ) as Node;

describe('Count', () => {
  it('renders without crashing', () => {
    createRoot((dispose) => {
      const container = document.createElement('div');

      container.appendChild(setup());

      expect(getByTestId(container, 'button-decrement').textContent).toBe('-');
      expect(getByTestId(container, 'button-increment').textContent).toBe('+');
      expect(getByTestId(container, 'display-count').textContent).toBe('00');

      dispose();
    });
  });

  it('updates', () => {
    createRoot(async (dispose) => {
      expect.assertions(2);

      const container = document.createElement('div');

      container.appendChild(setup({ initialCount: 2 }));

      expect(getByTestId(container, 'display-count').textContent).toBe('02');

      fireEvent.click(getByTestId(container, 'button-increment'));

      await waitFor(() =>
        expect(getByTestId(container, 'display-count').textContent).toBe('03'),
      );

      dispose();
    });
  });
});
