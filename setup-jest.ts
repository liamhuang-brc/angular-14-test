import 'jest-preset-angular/setup-jest';

// Add Jasmine global for compatibility
global.jasmine = {
  createSpyObj: (baseName: string, methodNames: string[]) => {
    const obj: any = {};
    methodNames.forEach(methodName => {
      obj[methodName] = jest.fn();
    });
    return obj;
  },
  objectContaining: (sample: any) => expect.objectContaining(sample),
  any: (constructor: any) => expect.any(constructor),
  anything: () => expect.anything(),
  arrayContaining: (sample: any[]) => expect.arrayContaining(sample),
  stringMatching: (expected: string | RegExp) => expect.stringMatching(expected),
} as any;


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
