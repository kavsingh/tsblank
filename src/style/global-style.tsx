// Rename import to preserve vscode syntax highlighting
import { glob as injectGlobal } from 'solid-styled-components';

export default (): null => {
  injectGlobal`
    html {
      box-sizing: border-box;
      font-size: 16px;
    }

    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }

    html,
    body {
      margin: 0;
      padding: 0;
    }

    #app-root {
      width: 100vw;
      height: 100vh;
      -webkit-overflow-scrolling: touch;
    }
`;

  return null;
};
