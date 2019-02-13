import { app } from './app';

describe('app test', () => {
  it('initializes app', () => {
    const mockElement = { innerText: null };
    const mockDocument: any = {
      createElement: jest.fn(() => mockElement),
      body: { appendChild: jest.fn() },
    };

    app(mockDocument);

    expect(mockDocument.createElement).toHaveBeenCalledWith('div');
    expect(mockElement.innerText).toBe('hello');
    expect(mockDocument.body.appendChild).toHaveBeenCalledWith(mockElement);
  });
});
