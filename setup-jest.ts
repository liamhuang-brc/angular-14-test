import 'jest-preset-angular/setup-jest';

// Global test environment setup
globalThis.ngJest = {
  testEnvironmentOptions: {
    errorOnUnknownElements: false,
    errorOnUnknownProperties: false
  }
};

// Suppress JSDOM errors for Angular tests
const originalError = console.error;
console.error = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('Error detected')) {
    return;
  }
  originalError.apply(console, args);
};

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
