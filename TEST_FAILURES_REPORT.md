# Test Failures Report

**Angular Upgrade:** 14.0.0 → 15.0.0

*This report contains detailed information about test failures that require manual attention.*

## Summary

- **Total Fixes Applied:** 34
- **Test Analysis Iterations:** 4
- **Max Retries:** 3
- **Remaining Failures:** 25

## Test Analysis Iterations

### Iteration 1 (Initial Verification)

- **Found:** 8 test failure(s)

### Iteration 2 (Retry 1)

- **Found:** 43 test failure(s)
- **Applied:** 3 fix(es) across 2 batch(es)

### Iteration 3 (Retry 2)

- **Found:** 29 test failure(s)
- **Applied:** 19 fix(es) across 9 batch(es)

### Iteration 4 (Retry 3)

- **Found:** 25 test failure(s)
- **Applied:** 12 fix(es) across 6 batch(es)

## Remaining Test Failures

The following 25 test failure(s) require manual attention (max retries of 3 reached):

### Unknown (21)

#### 1. `src/app/account/register.component.spec.ts`

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

#### 2. `src/app/services/account.service.spec.ts`

**Test:** `AccountService › Initialization › should initialize with user from localStorage`

**Error Message:**
```
expect(received).toBe(expected) // Object.is equality
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/services/account.service.spec.ts:49:43
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 3. `src/app/services/account.service.spec.ts`

**Test:** `AccountService › update() › should update user when same ID is logged in`

**Error Message:**
```
expect(received).toEqual(expected) // deep equality
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/services/account.service.spec.ts:112:43
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 4. `src/app/services/account.service.spec.ts`

**Test:** `AccountService › update() › should not update user if ID does not match current user`

**Error Message:**
```
expect(received).toEqual(expected) // deep equality
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/services/account.service.spec.ts:122:43
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 5. `src/app/services/account.service.spec.ts`

**Test:** `AccountService › delete() › should call logout if deleting current user`

**Error Message:**
```
expect(jest.fn()).toHaveBeenCalledTimes(expected)
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/services/account.service.spec.ts:134:31
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 6. `src/app/account/layout.component.spec.ts`

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

#### 7. `src/app/account/layout.component.spec.ts`

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

#### 8. `src/app/account/layout.component.spec.ts`

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

#### 9. `src/app/account/layout.component.spec.ts`

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

#### 10. `src/app/home/home.component.spec.ts`

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

#### 11. `src/app/home/home.component.spec.ts`

**Test:** `HomeComponent › Edge behavior › should handle case when AccountService returns null user`

**Error Message:**
```
expect(received).toBe(expected) // Object.is equality
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/home/home.component.spec.ts:85:48
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 12. `src/app/account/login.component.spec.ts`

**Test:** `LoginComponent › onSubmit() › should navigate to / on successful login`

**Error Message:**
```
expect(received).toHaveBeenCalledWith(...expected)
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/account/login.component.spec.ts:103:46
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 13. `src/app/account/login.component.spec.ts`

**Test:** `LoginComponent › onSubmit() › should clear alerts twice (only called once in real code)`

**Error Message:**
```
expect(jest.fn()).toHaveBeenCalledTimes(expected)
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/account/login.component.spec.ts:120:40
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 14. `src/app/users/add-edit.component.spec.ts`

**Test:** `AddEditComponent › Form validation › should mark form invalid when required fields are empty`

**Error Message:**
```
expect(received).toBeFalsy()
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/users/add-edit.component.spec.ts:79:38
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 15. `src/app/users/add-edit.component.spec.ts`

**Test:** `AddEditComponent › Form validation › should enforce password minlength rule`

**Error Message:**
```
expect(received).toBe(expected) // Object.is equality
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/users/add-edit.component.spec.ts:85:38
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 16. `src/app/users/add-edit.component.spec.ts`

**Test:** `AddEditComponent › Form validation › should not require password in edit mode`

**Error Message:**
```
expect(received).toBeFalsy()
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/users/add-edit.component.spec.ts:92:45
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 17. `src/app/users/add-edit.component.spec.ts`

**Test:** `AddEditComponent › onSubmit() › should not submit when form is invalid`

**Error Message:**
```
expect(jest.fn()).toHaveBeenCalled()
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/users/add-edit.component.spec.ts:101:19
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 18. `src/app/users/add-edit.component.spec.ts`

**Test:** `AddEditComponent › onSubmit() › should call accountService.register in add mode`

**Error Message:**
```
expect(jest.fn()).not.toHaveBeenCalled()
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/users/add-edit.component.spec.ts:113:47
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 19. `src/app/services/alert.service.spec.ts`

**Test:** `Console`

**Error Message:**
```
console.error
```

<details>
<summary>Stack Trace</summary>

```
          at reportException (/workspace/angular-14-test/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at Timeout.task [as _onTimeout] (/workspace/angular-14-test/node_modules/jsdom/lib/jsdom/browser/Window.js:584:9)
          at listOnTimeout (node:internal/timers:588:17)
          at processTimers (node:internal/timers:523:7) {
        detail: JestAssertionError: expect(received).toBe(expected) // Object.is equality
```

</details>

#### 20. `src/app/services/alert.service.spec.ts`

**Test:** `AlertService › convenience methods › should emit error alert with message and type`

**Error Message:**
```
expect(received).toBe(expected) // Object.is equality
```

<details>
<summary>Stack Trace</summary>

```
      at Object.next (src/app/services/alert.service.spec.ts:80:27)
      at ConsumerObserver.Object.<anonymous>.ConsumerObserver.next (node_modules/rxjs/dist/cjs/internal/Subscriber.js:113:33)
      at SafeSubscriber.Object.<anonymous>.Subscriber._next (node_modules/rxjs/dist/cjs/internal/Subscriber.js:80:26)
      at SafeSubscriber.Object.<anonymous>.Subscriber.next (node_modules/rxjs/dist/cjs/internal/Subscriber.js:51:18)
      at node_modules/rxjs/dist/cjs/internal/operators/filter.js:9:164
      at OperatorSubscriber._this._next (node_modules/rxjs/dist/cjs/internal/operators/OperatorSubscriber.js:33:21)
      at OperatorSubscriber.Object.<anonymous>.Subscriber.next (node_modules/rxjs/dist/cjs/internal/Subscriber.js:51:18)
      at node_modules/rxjs/dist/cjs/internal/Subject.js:69:34
      at Object.errorContext (node_modules/rxjs/dist/cjs/internal/util/errorContext.js:22:9)
      at Subject.Object.<anonymous>.Subject.next (node_modules/rxjs/dist/cjs/internal/Subject.js:59:24)
      at AlertService.alert (src/app/services/alert.service.ts:37:22)
      at AlertService.error (src/app/services/alert.service.ts:23:14)
      at src/app/services/alert.service.spec.ts:84:15
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 21. `src/app/services/alert.service.spec.ts`

**Test:** `AlertService › convenience methods › should emit error alert with message and type`

**Error Message:**
```
thrown: "Exceeded timeout of 5000 ms for a test while waiting for `done()` to be called.
```

<details>
<summary>Stack Trace</summary>

```
      at context.<computed> (node_modules/zone.js/bundles/zone-testing.umd.js:841:39)
      at src/app/services/alert.service.spec.ts:77:5
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at node_modules/zone.js/bundles/zone-testing.umd.js:780:33
      at context.<computed> (node_modules/zone.js/bundles/zone-testing.umd.js:823:39)
      at src/app/services/alert.service.spec.ts:66:3
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at node_modules/zone.js/bundles/zone-testing.umd.js:780:33
      at context.<computed> (node_modules/zone.js/bundles/zone-testing.umd.js:823:39)
      at Object.<anonymous> (src/app/services/alert.service.spec.ts:4:1)
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
      at src/app/components/alert.component.spec.ts:49:17
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
      at src/app/components/alert.component.spec.ts:49:17
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
      at src/app/components/alert.component.spec.ts:49:17
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
      at src/app/components/alert.component.spec.ts:49:17
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

---
