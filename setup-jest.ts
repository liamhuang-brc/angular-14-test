import 'jest-preset-angular/setup-jest';

// Optional: silence Angular test env warnings
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
});
Object.defineProperty(document.body.style, 'transform', {
  value: () => ({
    enumerable: true,
    configurable: true,
  }),
});


// Add jasmine global for compatibility with jasmine-style spies
import 'jest-preset-angular/setup-jest';

global.jasmine = {
  createSpyObj: (baseName: string, methodNames: string[]) => {
    const obj: any = {};
    methodNames.forEach(methodName => {
      obj[methodName] = jest.fn();
    });
    return obj;
  },
  objectContaining: (sample: any) => expect.objectContaining(sample),
  any: (constructor: any) => expect.any(constructor)
} as any;
