// Import zone.js testing FIRST before any Angular imports
import 'zone.js';
import 'zone.js/testing';

// Import jest setup BEFORE Angular test environment configuration
import 'jest-preset-angular/setup-jest';

// Configure test environment AFTER jest setup
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// First destroy any existing test environment
getTestBed().resetTestEnvironment();

// Initialize test environment
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Configure ProxyZone for Angular 15 compatibility
if (typeof Zone !== 'undefined') {
  // Ensure ProxyZoneSpec is available
  if (!Zone.ProxyZoneSpec) {
    Zone.ProxyZoneSpec = class ProxyZoneSpec {
      name = 'ProxyZone';
      properties: any = { ProxyZoneSpec: this };
      
      constructor(private defaultSpecDelegate?: any) {}
      
      onScheduleTask(delegate: any, current: any, target: any, task: any) {
        return delegate ? delegate.onScheduleTask(target, task) : task;
      }
      
      onInvokeTask(delegate: any, current: any, target: any, task: any, applyThis: any, applyArgs: any) {
        return delegate ? delegate.onInvokeTask(target, task, applyThis, applyArgs) : task.callback.apply(applyThis, applyArgs);
      }
      
      onCancelTask(delegate: any, current: any, target: any, task: any) {
        return delegate ? delegate.onCancelTask(target, task) : task;
      }
      
      onInvoke(delegate: any, current: any, target: any, callback: any, applyThis: any, applyArgs: any) {
        return delegate ? delegate.onInvoke(target, callback, applyThis, applyArgs) : callback.apply(applyThis, applyArgs);
      }
    };
  }
  
  // Create and install ProxyZone
  const proxyZoneSpec = new Zone.ProxyZoneSpec();
  const proxyZone = Zone.current.fork(proxyZoneSpec);
  
  // Ensure ProxyZone is running for all tests
  beforeEach(() => {
    if (!Zone.current.name.includes('ProxyZone')) {
      proxyZone.run(() => {});
    }
  });roxyZone for all tests
  beforeEach(() => {
    Zone.current = proxyZone;
  });
}, source: any) {
      return delegate ? delegate.onInvoke(target, callback, applyThis, applyArgs, source) : callback.apply(applyThis, applyArgs);
    }
    
    onHandleError(delegate: any, current: any, target: any, error: any) {
      return delegate ? delegate.onHandleError(target, error) : false;
    }
    
    onHasTask(delegate: any, current: any, target: any, hasTaskState: any) {
      return delegate ? delegate.onHasTask(target, hasTaskState) : undefined;
    }
  };
}

// Optional: silence Angular test env warnings
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => ''
  })
});
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
});
Object.defineProperty(document.body.style, 'transform', {
  value: () => ({
    enumerable: true,
    configurable: true,
  }),
});

// Mock IntersectionObserver
(globalThis as any).IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
};
