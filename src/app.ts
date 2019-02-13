export const app = (doc: Document): void => {
  const content = doc.createElement('div');

  content.innerHTML = 'hello';
  doc.body.appendChild(content);
};
