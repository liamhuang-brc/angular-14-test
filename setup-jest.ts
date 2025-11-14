import 'jest-preset-angular/setup-jest';
import 'zone.js';
import 'zone.js/testing';

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




// Make jasmine globally available for tests using jasmine types
import jasmineNamespace from 'jasmine';

(global as any).jasmine = jasmineNamespace;
