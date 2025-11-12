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


// Suppress JSDOM errors from being logged to console
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  const message = args[0]?.toString() || '';
  if (message.includes('Error: Not implemented') || 
   message.includes('reportException') ||
      message.includes('jsdom/lib/jsdom')) {
   return;
  }
  originalConsoleError(...args);
};