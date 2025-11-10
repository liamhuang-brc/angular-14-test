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


// Add Jest custom matchers for better Angular testing
expect.extend({
  toBeTrue(received) {
    const pass = received === true;
    return {
      message: () => `expected ${received} to be true`,
      pass,
    };
  },
  toBeFalse(received) {
    const pass = received === false;
    return {
      message: () => `expected ${received} to be false`,
      pass,
    };
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