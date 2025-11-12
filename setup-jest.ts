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
// Global Jasmine types for Jest compatibility
global.jasmine = {
   createSpyObj: (baseName: string, methodNames: string[]) => {
    const obj: any = {};
   methodNames.forEach(methodName => {
   obj[methodName] = jest.fn().mockReturnValue(undefined);
      obj[methodName].and = {
   returnValue: (value: any) => {
          obj[methodName].mockReturnValue(value);
   return obj[methodName];
        }
      };
    });
    return obj;
  },
   objectContaining: (sample: any) => expect.objectContaining(sample),
  any: (expectedClass: any) => expect.any(expectedClass)
} as any;

// Add Jasmine matchers for Jest
expect.extend({
  toBeTrue(received: any) {
    const pass = received === true;
    return {
      pass,
      message: () => pass ? `expected ${received} not to be true` : `expected ${received} to be true`
    };
  },
  toBeFalse(received: any) {
    const pass = received === false;
    return {
      pass,
      message: () => pass ? `expected ${received} not to be false` : `expected ${received} to be false`
    };
  }
});
