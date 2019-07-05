import { app } from './app';

const appRoot = document.getElementById('app-root');

if (appRoot) app(appRoot);
else throw new Error('Could not find root element #app-root');
