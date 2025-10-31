# Test Failures Report

**Angular Upgrade:** 14.0.0 → 15.0.0

*This report contains detailed information about test failures that require manual attention.*

## Summary

- **Total Fixes Applied:** 42
- **Test Analysis Iterations:** 4
- **Max Retries:** 3
- **Remaining Failures:** 15

## Test Analysis Iterations

### Iteration 1 (Initial Verification)

- **Found:** 8 test failure(s)

### Iteration 2 (Retry 1)

- **Found:** 8 test failure(s)
- **Applied:** 14 fix(es) across 2 batch(es)

### Iteration 3 (Retry 2)

- **Found:** 30 test failure(s)
- **Applied:** 2 fix(es) across 2 batch(es)

### Iteration 4 (Retry 3)

- **Found:** 15 test failure(s)
- **Applied:** 26 fix(es) across 6 batch(es)

## Remaining Test Failures

The following 15 test failure(s) require manual attention (max retries of 3 reached):

### Unknown (11)

#### 1. `src/app/services/account.service.spec.ts`

**Test:** `AccountService › Initialization › should initialize with user from localStorage`

**Error Message:**
```
expect(received).toBe(expected) // Object.is equality
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/services/account.service.spec.ts:47:43
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 2. `src/app/services/account.service.spec.ts`

**Test:** `AccountService › update() › should update user when same ID is logged in`

**Error Message:**
```
expect(received).toBe(expected) // Object.is equality
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/services/account.service.spec.ts:110:43
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 3. `src/app/services/account.service.spec.ts`

**Test:** `AccountService › update() › should not update user if ID does not match current user`

**Error Message:**
```
expect(received).toBe(expected) // Object.is equality
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/services/account.service.spec.ts:120:50
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 4. `src/app/services/account.service.spec.ts`

**Test:** `AccountService › delete() › should call logout if deleting current user`

**Error Message:**
```
expect(jest.fn()).toHaveBeenCalledTimes(expected)
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/services/account.service.spec.ts:132:31
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

#### 7. `src/app/account/layout.component.spec.ts`

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
      at src/app/account/layout.component.spec.ts:29:27
```

</details>

#### 8. `src/app/account/layout.component.spec.ts`

**Test:** `LayoutComponent › Component creation › should redirect to home immediately on init (incorrect default state)`

**Error Message:**
```
expect(jest.fn()).toHaveBeenCalledWith(...expected)
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/account/layout.component.spec.ts:43:37
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 9. `src/app/account/layout.component.spec.ts`

**Test:** `LayoutComponent › Redirection logic › should use navigateByUrl instead of navigate (wrong router method)`

**Error Message:**
```
expect(received).toHaveBeenCalledWith(...expected)
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/account/layout.component.spec.ts:69:51
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 10. `src/app/account/layout.component.spec.ts`

**Test:** `LayoutComponent › Redirection logic › should call navigate twice (only once in actual code)`

**Error Message:**
```
expect(jest.fn()).toHaveBeenCalledTimes(expected)
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/account/layout.component.spec.ts:77:37
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 11. `src/app/account/register.component.spec.ts`

**Test:** `RegisterComponent › should mark form invalid if required fields missing`

**Error Message:**
```
TypeError: expect(...).toBeTrue is not a function
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/account/register.component.spec.ts:59:36
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

---

### Async Error (4)

#### 1. `src/app/components/alert.component.spec.ts`

**Test:** `AlertComponent › removeAlert › should remove the alert immediately if fade is false`

**Error Message:**
```
TypeError: Cannot read properties of undefined (reading 'unsubscribe')
```

<details>
<summary>Stack Trace</summary>

```
      at AlertComponent.ngOnDestroy (src/app/components/alert.component.ts:52:32)
      at executeOnDestroys (node_modules/@angular/core/fesm2020/core.mjs:5976:32)
      at cleanUpView (node_modules/@angular/core/fesm2020/core.mjs:5886:9)
      at destroyViewTree (node_modules/@angular/core/fesm2020/core.mjs:5719:17)
      at destroyLView (node_modules/@angular/core/fesm2020/core.mjs:5864:9)
      at RootViewRef.destroy (node_modules/@angular/core/fesm2020/core.mjs:11804:9)
      at ComponentRef.destroy (node_modules/@angular/core/fesm2020/core.mjs:12226:23)
      at ComponentFixture.destroy (node_modules/@angular/core/fesm2020/testing.mjs:213:31)
      at src/app/components/alert.component.spec.ts:42:17
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 2. `src/app/components/alert.component.spec.ts`

**Test:** `AlertComponent › removeAlert › should fade out and remove alert after timeout if fade is true`

**Error Message:**
```
TypeError: Cannot read properties of undefined (reading 'unsubscribe')
```

<details>
<summary>Stack Trace</summary>

```
      at AlertComponent.ngOnDestroy (src/app/components/alert.component.ts:52:32)
      at executeOnDestroys (node_modules/@angular/core/fesm2020/core.mjs:5976:32)
      at cleanUpView (node_modules/@angular/core/fesm2020/core.mjs:5886:9)
      at destroyViewTree (node_modules/@angular/core/fesm2020/core.mjs:5719:17)
      at destroyLView (node_modules/@angular/core/fesm2020/core.mjs:5864:9)
      at RootViewRef.destroy (node_modules/@angular/core/fesm2020/core.mjs:11804:9)
      at ComponentRef.destroy (node_modules/@angular/core/fesm2020/core.mjs:12226:23)
      at ComponentFixture.destroy (node_modules/@angular/core/fesm2020/testing.mjs:213:31)
      at src/app/components/alert.component.spec.ts:42:17
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 3. `src/app/components/alert.component.spec.ts`

**Test:** `AlertComponent › cssClass › should return correct classes for success alert`

**Error Message:**
```
TypeError: Cannot read properties of undefined (reading 'unsubscribe')
```

<details>
<summary>Stack Trace</summary>

```
      at AlertComponent.ngOnDestroy (src/app/components/alert.component.ts:52:32)
      at executeOnDestroys (node_modules/@angular/core/fesm2020/core.mjs:5976:32)
      at cleanUpView (node_modules/@angular/core/fesm2020/core.mjs:5886:9)
      at destroyViewTree (node_modules/@angular/core/fesm2020/core.mjs:5719:17)
      at destroyLView (node_modules/@angular/core/fesm2020/core.mjs:5864:9)
      at RootViewRef.destroy (node_modules/@angular/core/fesm2020/core.mjs:11804:9)
      at ComponentRef.destroy (node_modules/@angular/core/fesm2020/core.mjs:12226:23)
      at ComponentFixture.destroy (node_modules/@angular/core/fesm2020/testing.mjs:213:31)
      at src/app/components/alert.component.spec.ts:42:17
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 4. `src/app/components/alert.component.spec.ts`

**Test:** `AlertComponent › cssClass › should not break when alert is undefined`

**Error Message:**
```
TypeError: Cannot read properties of undefined (reading 'unsubscribe')
```

<details>
<summary>Stack Trace</summary>

```
      at AlertComponent.ngOnDestroy (src/app/components/alert.component.ts:52:32)
      at executeOnDestroys (node_modules/@angular/core/fesm2020/core.mjs:5976:32)
      at cleanUpView (node_modules/@angular/core/fesm2020/core.mjs:5886:9)
      at destroyViewTree (node_modules/@angular/core/fesm2020/core.mjs:5719:17)
      at destroyLView (node_modules/@angular/core/fesm2020/core.mjs:5864:9)
      at RootViewRef.destroy (node_modules/@angular/core/fesm2020/core.mjs:11804:9)
      at ComponentRef.destroy (node_modules/@angular/core/fesm2020/core.mjs:12226:23)
      at ComponentFixture.destroy (node_modules/@angular/core/fesm2020/testing.mjs:213:31)
      at src/app/components/alert.component.spec.ts:42:17
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

---
