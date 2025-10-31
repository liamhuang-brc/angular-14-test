# Test Failures Report

**Angular Upgrade:** 14.0.0 → 15.0.0

*This report contains detailed information about test failures that require manual attention.*

## Summary

- **Total Fixes Applied:** 64
- **Test Analysis Iterations:** 4
- **Max Retries:** 3
- **Remaining Failures:** 7

## Test Analysis Iterations

### Iteration 1 (Initial Verification)

- **Found:** 8 test failure(s)

### Iteration 2 (Retry 1)

- **Found:** 43 test failure(s)
- **Applied:** 3 fix(es) across 2 batch(es)

### Iteration 3 (Retry 2)

- **Found:** 13 test failure(s)
- **Applied:** 48 fix(es) across 9 batch(es)

### Iteration 4 (Retry 3)

- **Found:** 7 test failure(s)
- **Applied:** 13 fix(es) across 4 batch(es)

## Remaining Test Failures

The following 7 test failure(s) require manual attention (max retries of 3 reached):

### Unknown (7)

#### 1. `src/app/components/alert.component.spec.ts`

**Test:** `Console`

**Error Message:**
```
console.warn
```

<details>
<summary>Stack Trace</summary>

```
            at FakeTimers._checkFakeTimers (node_modules/@jest/environment-jsdom-abstract/node_modules/@jest/fake-timers/build/index.js:641:7)
            at FakeTimers.runOnlyPendingTimers (node_modules/@jest/environment-jsdom-abstract/node_modules/@jest/fake-timers/build/index.js:541:14)
            at src/app/components/alert.component.spec.ts:141:14
            at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
            at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
            at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
            at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
            at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
    [0m [90m 139 |[39m     afterEach(() [33m=>[39m {
```

</details>

#### 2. `src/app/components/alert.component.spec.ts`

**Test:** `AlertComponent › cssClass › should return correct classes for success alert`

**Error Message:**
```
TypeError: Cannot read properties of undefined (reading 'isFake')
```

<details>
<summary>Stack Trace</summary>

```
      at Object.install (node_modules/@jest/environment-jsdom-abstract/node_modules/@sinonjs/fake-timers/src/fake-timers-src.js:1764:26)
      at FakeTimers.useFakeTimers (node_modules/@jest/environment-jsdom-abstract/node_modules/@jest/fake-timers/build/index.js:605:36)
      at src/app/components/alert.component.spec.ts:16:14
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 3. `src/app/components/alert.component.spec.ts`

**Test:** `AlertComponent › cssClass › should not break when alert is undefined`

**Error Message:**
```
TypeError: Cannot read properties of undefined (reading 'isFake')
```

<details>
<summary>Stack Trace</summary>

```
      at Object.install (node_modules/@jest/environment-jsdom-abstract/node_modules/@sinonjs/fake-timers/src/fake-timers-src.js:1764:26)
      at FakeTimers.useFakeTimers (node_modules/@jest/environment-jsdom-abstract/node_modules/@jest/fake-timers/build/index.js:605:36)
      at src/app/components/alert.component.spec.ts:16:14
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 4. `src/app/components/alert.component.spec.ts`

**Test:** `AlertComponent › ngOnDestroy › should unsubscribe from alert and route subscriptions`

**Error Message:**
```
TypeError: Cannot read properties of undefined (reading 'isFake')
```

<details>
<summary>Stack Trace</summary>

```
      at Object.install (node_modules/@jest/environment-jsdom-abstract/node_modules/@sinonjs/fake-timers/src/fake-timers-src.js:1764:26)
      at FakeTimers.useFakeTimers (node_modules/@jest/environment-jsdom-abstract/node_modules/@jest/fake-timers/build/index.js:605:36)
      at src/app/components/alert.component.spec.ts:16:14
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 5. `src/app/home/home.component.spec.ts`

**Test:** `HomeComponent › Initialization › should display user first name in the greeting`

**Error Message:**
```
expect(received).toBe(expected) // Object.is equality
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/home/home.component.spec.ts:53:48
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 6. `src/app/home/home.component.spec.ts`

**Test:** `HomeComponent › Template rendering › should render paragraph content correctly`

**Error Message:**
```
expect(received).toBe(expected) // Object.is equality
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/home/home.component.spec.ts:70:39
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 7. `src/app/home/home.component.spec.ts`

**Test:** `Console`

**Error Message:**
```
console.error
```

<details>
<summary>Stack Trace</summary>

```
      at validateElementIsKnown (node_modules/@angular/core/fesm2020/core.mjs:4891:25)
      at ɵɵelementStart (node_modules/@angular/core/fesm2020/core.mjs:13584:9)
      at ɵɵelement (node_modules/@angular/core/fesm2020/core.mjs:13656:5)
      at LayoutComponent_Template (ng:/LayoutComponent.js:9:9)
      at executeTemplate (node_modules/@angular/core/fesm2020/core.mjs:10441:9)
      at renderView (node_modules/@angular/core/fesm2020/core.mjs:10263:13)
      at renderComponent (node_modules/@angular/core/fesm2020/core.mjs:11434:5)
      at renderChildComponents (node_modules/@angular/core/fesm2020/core.mjs:10122:9)
      at renderView (node_modules/@angular/core/fesm2020/core.mjs:10288:13)
      at ComponentFactory.create (node_modules/@angular/core/fesm2020/core.mjs:12178:13)
      at initComponent (node_modules/@angular/core/fesm2020/testing.mjs:24275:51)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at Object.onInvoke (node_modules/@angular/core/fesm2020/core.mjs:24210:33)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at NgZone.run (node_modules/@angular/core/fesm2020/core.mjs:24064:28)
      at TestBedImpl.createComponent (node_modules/@angular/core/fesm2020/testing.mjs:24278:41)
      at Function.createComponent (node_modules/@angular/core/fesm2020/testing.mjs:24083:37)
      at src/app/account/layout.component.spec.ts:30:27
```

</details>

---
