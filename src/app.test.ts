import { app } from './app';

describe('app test', () => {
  it('initializes app', () => {
    const mockElement = { innerHTML: null };
    const mockDocument: any = {
      createElement: jest.fn(() => mockElement),
      body: { appendChild: jest.fn() },
    };

    app(mockDocument);

    expect(mockDocument.createElement).toHaveBeenCalledWith('div');
    expect(mockElement.innerHTML).toBe('hello');
    expect(mockDocument.body.appendChild).toHaveBeenCalledWith(mockElement);
  });
});
