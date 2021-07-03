import { lazy } from 'solid-js';
import { Suspense } from 'solid-js/web';
import { ThemeProvider, styled } from 'solid-styled-components';

import GlobalStyle from './style/global-style';
import { defaultTheme } from './style/theme';

import type { Component } from 'solid-js';

const App: Component = () => (
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />
    <UIRoot>
      <Suspense fallback={<Loader />}>
        <LazyCount initialCount={0} />
        <LazyCount initialCount={10} />
      </Suspense>
    </UIRoot>
  </ThemeProvider>
);

export default App;

const LazyCount = lazy(() => import('./components/count'));

const Loader = () => <div>Loading...</div>;

const UIRoot = styled('div')`
  min-height: 100%;
  padding: 1em;
  color: ${({ theme }) => theme.colors.bodyText};
  font-family: ${({ theme }) => theme.fonts.bodyText};
  background-color: ${({ theme }) => theme.colors.background};
`;
