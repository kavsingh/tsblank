export default (appRoot: HTMLElement | null): void => {
  if (!appRoot) throw new Error('Could not find root element');

  appRoot.innerHTML = 'hello';
};
