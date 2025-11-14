import 'zone.js';
import 'zone.js/testing';

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
// Add jasmine global for compatibility
(global as any).jasmine = {
   createSpy: jest.fn,
  createSpyObj: (baseName: string, methodNames: string[]) => {
    const obj: any = {};
    methodNames.forEach(name => {
      obj[name] = jest.fn();
    });
   return obj;
  },
  objectContaining: expect.objectContaining,
  any: expect.any
};
