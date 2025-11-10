
// Import jest-preset-angular setup first - MUST be before any Jest usage
import 'jest-preset-angular/setup-jest';

// Ensure Jest matchers are properly typed
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeTrue(): R;
      toBeFalse(): R;
    }
  }
}

// Add custom Jest matchers for better compatibility
expect.extend({
  toBeTrue(received: boolean) {
    const pass = received === true;
    return {
      message: () => `expected ${received} to be true`,
      pass,
    };
  },
  toBeFalse(received: boolean) {
    const pass = received === false;
    return {
      message: () => `expected ${received} to be false`,
      pass,
    };
  },
});

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
