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

import 'jest-preset-angular/setup-jest';

// Add custom Jest matchers if needed
expect.extend({
  toBeTrue(received) {
    const pass = received === true;
    if (pass) {
      return {
        message: () => `expected ${received} not to be true`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be true`,
        pass: false,
      };
    }
  },
  toBeFalse(received) {
    const pass = received === false;
    if (pass) {
      return {
        message: () => `expected ${received} not to be false`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be false`,
        pass: false,
      };
    }
  },
});

// Declare the custom matchers for TypeScript
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeTrue(): R;
      toBeFalse(): R;
    }
  }
}
