import { render } from 'solid-js/web';

import App from './app';

const appRoot = document.getElementById('app-root');

if (appRoot) render(() => <App />, appRoot);
