# Test Analysis Report

**Angular Upgrade:** 14.0.0 → 15.0.0

*This report contains detailed information about test analysis, including applied fixes and remaining failures.*

## Summary

- **Total Fixes Applied:** 22
- **Test Analysis Iterations:** 11
- **Max Retries:** 10
- **Remaining Failures:** 27

## Test Analysis Iterations

### Iteration 1 (Initial Verification)

- **Found:** 8 test failure(s)


### Iteration 2 (Retry 1)

- **Found:** 8 test failure(s)


### Iteration 3 (Retry 2)

- **Found:** 43 test failure(s)
- **Applied:** 2 fix(es) across 2 batch(es)

<details>
<summary>Fixes applied (2):</summary>

#### `src/app/account/register.component.spec.ts` (2 fix(es))

**Fix 1: Replace** (Confidence: 100%)

Replace Jasmine SpyObj types with Jest Mocked types

**Original Code:**
```typescript
let accountServiceSpy: jasmine.SpyObj<AccountService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;
  let routerSpy: jasmine.SpyObj<Router>;
```

**Fixed Code:**
```typescript
let accountServiceSpy: jest.Mocked<AccountService>;
  let alertServiceSpy: jest.Mocked<AlertService>;
  let routerSpy: jest.Mocked<Router>;
```

**Fix 2: Replace** (Confidence: 100%)

Replace jasmine.createSpyObj with Jest mock objects using jest.fn()

**Original Code:**
```typescript
accountServiceSpy = jasmine.createSpyObj('AccountService', ['register']);
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['clear', 'success', 'error']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
```

**Fixed Code:**
```typescript
accountServiceSpy = {
      register: jest.fn()
    } as jest.Mocked<AccountService>;
    alertServiceSpy = {
      clear: jest.fn(),
      success: jest.fn(),
      error: jest.fn()
    } as jest.Mocked<AlertService>;
    routerSpy = {
      navigate: jest.fn()
    } as jest.Mocked<Router>;
```

---

</details>


### Iteration 4 (Retry 3)

- **Found:** 27 test failure(s)
- **Applied:** 20 fix(es) across 8 batch(es)

<details>
<summary>Fixes applied (18):</summary>

#### `src/app/account/register.component.spec.ts` (4 fix(es))

**Fix 1: Replace** (Confidence: 100%)

Replace Jasmine's and.returnValue with Jest's mockReturnValue

**Original Code:**
```typescript
accountServiceSpy.register.and.returnValue(of({}));
```

**Fixed Code:**
```typescript
accountServiceSpy.register.mockReturnValue(of({}));
```

**Fix 2: Replace** (Confidence: 100%)

Replace jasmine.objectContaining with Jest's expect.objectContaining

**Original Code:**
```typescript
expect(accountServiceSpy.register).toHaveBeenCalledWith(jasmine.objectContaining({
      firstName: 'John'
    }));
```

**Fixed Code:**
```typescript
expect(accountServiceSpy.register).toHaveBeenCalledWith(expect.objectContaining({
      firstName: 'John'
    }));
```

**Fix 3: Replace** (Confidence: 100%)

Replace Jasmine's and.returnValue with Jest's mockReturnValue for error case

**Original Code:**
```typescript
accountServiceSpy.register.and.returnValue(throwError(() => 'Server error'));
```

**Fixed Code:**
```typescript
accountServiceSpy.register.mockReturnValue(throwError(() => 'Server error'));
```

**Fix 4: Replace** (Confidence: 100%)

Replace Jasmine-specific toBeTrue() matcher with Jest-compatible toBe(true)

**Original Code:**
```typescript
it('should mark form invalid if required fields missing', () => {
    component.onSubmit();
    expect(component.form.invalid).toBeTrue();
  });
```

**Fixed Code:**
```typescript
it('should mark form invalid if required fields missing', () => {
    component.onSubmit();
    expect(component.form.invalid).toBe(true);
  });
```

---

#### `src/app/services/account.service.spec.ts` (7 fix(es))

**Fix 1: Replace** (Confidence: 90%)

Re-initialize service after localStorage is set to ensure it picks up the stored user

**Original Code:**
```typescript
describe('Initialization', () => {
        it('should initialize with user from localStorage', () => {
            const currentUser = service.userValue;
            expect(currentUser?.username).toBe('ShashankBharadwaj');
        });
    });
```

**Fixed Code:**
```typescript
describe('Initialization', () => {
        it('should initialize with user from localStorage', () => {
            // Re-initialize service to pick up localStorage
            service = TestBed.inject(AccountService);
            const currentUser = service.userValue;
            expect(currentUser?.username).toBe('ShashankBharadwaj');
        });
    });
```

**Fix 2: Replace** (Confidence: 100%)

Fix assertion to check for 'username' property instead of 'user' property in request body, matching the actual service implementation

**Original Code:**
```typescript
it('should call API with username and password', () => {
            service.login('ShashankBharadwaj', 'password123').subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/authenticate`);

            expect(req.request.body.user).toBe('ShashankBharadwaj');
        });
```

**Fixed Code:**
```typescript
it('should call API with username and password', () => {
            service.login('ShashankBharadwaj', 'password123').subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/authenticate`);

            expect(req.request.body.username).toBe('ShashankBharadwaj');
        });
```

**Fix 3: Replace** (Confidence: 100%)

Fix assertion to expect null instead of empty object, matching the actual service implementation which sets userSubject.next(null)

**Original Code:**
```typescript
it('should clear user from localStorage and navigate to login', () => {
            service.logout();

            expect(service.userValue).toEqual({});

            expect(localStorage.getItem('user')).toBeNull();
            expect(routerMock.navigate).toHaveBeenCalledWith(['/account/login']);
        });
```

**Fixed Code:**
```typescript
it('should clear user from localStorage and navigate to login', () => {
            service.logout();

            expect(service.userValue).toBeNull();

            expect(localStorage.getItem('user')).toBeNull();
            expect(routerMock.navigate).toHaveBeenCalledWith(['/account/login']);
        });
```

**Fix 4: Replace** (Confidence: 100%)

Fix assertion to expect POST method instead of PUT, matching the actual service implementation which uses http.post()

**Original Code:**
```typescript
it('should call POST /users/register API', () => {
            const newUser: User = { id: '2', username: 'liam', firstName: 'Liam', lastName: 'Huang', token: '' };

            service.register(newUser).subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/register`);

            expect(req.request.method).toBe('PUT');
        });
```

**Fixed Code:**
```typescript
it('should call POST /users/register API', () => {
            const newUser: User = { id: '2', username: 'liam', firstName: 'Liam', lastName: 'Huang', token: '' };

            service.register(newUser).subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/register`);

            expect(req.request.method).toBe('POST');
        });
```

**Fix 5: Replace** (Confidence: 95%)

Fix test to use correct user ID '101' from mockUser and expect the updated firstName 'Max' instead of 'John'

**Original Code:**
```typescript
it('should update user when same ID is logged in', () => {
            const updatePayload = { firstName: 'Max' };

            service.update('1', updatePayload).subscribe();

            const req = httpMock.expectOne(`${environment.apiUrl}/users/1`);
            expect(req.request.method).toBe('PUT');
            req.flush({});

            const updatedUser = JSON.parse(localStorage.getItem('user')!);

            expect(updatedUser.firstName).toBe('John');
        });
```

**Fixed Code:**
```typescript
it('should update user when same ID is logged in', () => {
            const updatePayload = { firstName: 'Max' };

            service.update('101', updatePayload).subscribe();

            const req = httpMock.expectOne(`${environment.apiUrl}/users/101`);
            expect(req.request.method).toBe('PUT');
            req.flush({});

            const updatedUser = JSON.parse(localStorage.getItem('user')!);

            expect(updatedUser.firstName).toBe('Max');
        });
```

**Fix 6: Replace** (Confidence: 95%)

Fix test to use correct user ID '101' from mockUser to match the logged-in user

**Original Code:**
```typescript
it('should call logout if deleting current user', () => {
            const spyLogout = jest.spyOn(service, 'logout');

            service.delete('1').subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/1`);
            req.flush({});

            expect(spyLogout).toHaveBeenCalledTimes(1);
        });
```

**Fixed Code:**
```typescript
it('should call logout if deleting current user', () => {
            const spyLogout = jest.spyOn(service, 'logout');

            service.delete('101').subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/101`);
            req.flush({});

            expect(spyLogout).toHaveBeenCalledTimes(1);
        });
```

**Fix 7: Replace** (Confidence: 95%)

Fix test assertion to expect logout NOT to be called when deleting a different user (add .not)

**Original Code:**
```typescript
it('should not call logout if deleting another user', () => {
            const spyLogout = jest.spyOn(service, 'logout');

            service.delete('2').subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/2`);
            req.flush({});

            expect(spyLogout).toHaveBeenCalled();
        });
```

**Fixed Code:**
```typescript
it('should not call logout if deleting another user', () => {
            const spyLogout = jest.spyOn(service, 'logout');

            service.delete('2').subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/2`);
            req.flush({});

            expect(spyLogout).not.toHaveBeenCalled();
        });
```

---

#### `src/app/home/home.component.spec.ts` (2 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Fix test to expect correct firstName 'Shashank' from mockUser instead of 'John'

**Original Code:**
```typescript
it('should assign user from AccountService', () => {
            fixture.detectChanges();
            expect(component.user?.firstName).toEqual('John');
        });
```

**Fixed Code:**
```typescript
it('should assign user from AccountService', () => {
            fixture.detectChanges();
            expect(component.user?.firstName).toEqual('Shashank');
        });
```

**Fix 2: Replace** (Confidence: 95%)

Fix test to expect correct greeting 'Hi Shashank' based on mockUser firstName instead of 'Hi John'

**Original Code:**
```typescript
it('should display user first name in the greeting', () => {
            fixture.detectChanges();
            const heading = fixture.debugElement.query(By.css('h1')).nativeElement;

            expect(heading.textContent.trim()).toBe('Hi John');
        });
```

**Fixed Code:**
```typescript
it('should display user first name in the greeting', () => {
            fixture.detectChanges();
            const heading = fixture.debugElement.query(By.css('h1')).nativeElement;

            expect(heading.textContent.trim()).toBe('Hi Shashank');
        });
```

---

#### `src/app/account/login.component.spec.ts` (2 fix(es))

**Fix 1: Replace** (Confidence: 98%)

Fix test to expect navigateByUrl instead of navigate, matching the actual implementation

**Original Code:**
```typescript
it('should navigate to / on successful login', () => {
            component.form.setValue({ username: 'test', password: '1234' });
            accountService.login = jest.fn().mockReturnValue(of(true));

            component.onSubmit();

            expect((router as any).navigate).toHaveBeenCalledWith('/');
        });
```

**Fixed Code:**
```typescript
it('should navigate to / on successful login', () => {
            component.form.setValue({ username: 'test', password: '1234' });
            accountService.login = jest.fn().mockReturnValue(of(true));

            component.onSubmit();

            expect(router.navigateByUrl).toHaveBeenCalledWith('/');
        });
```

**Fix 2: Replace** (Confidence: 98%)

Fix test to expect 1 call to alertService.clear, matching the actual implementation

**Original Code:**
```typescript
it('should clear alerts twice (only called once in real code)', () => {
            component.form.setValue({ username: '', password: '' });
            component.onSubmit();
            expect(alertService.clear).toHaveBeenCalledTimes(2);
        });
```

**Fixed Code:**
```typescript
it('should clear alerts once on submit', () => {
            component.form.setValue({ username: '', password: '' });
            component.onSubmit();
            expect(alertService.clear).toHaveBeenCalledTimes(1);
        });
```

---

#### `src/app/account/layout.component.spec.ts` (3 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Fix test to correctly expect no navigation when userValue is null (default MockAccountService state)

**Original Code:**
```typescript
it('should redirect to home immediately on init (incorrect default state)', () => {
            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });
```

**Fixed Code:**
```typescript
it('should not redirect when userValue is null by default', () => {
            expect(router.navigate).not.toHaveBeenCalled();
        });
```

**Fix 2: Replace** (Confidence: 95%)

Fix test to expect navigate() method which is what the actual implementation uses

**Original Code:**
```typescript
it('should use navigateByUrl instead of navigate (wrong router method)', () => {
            accountService.userValue = { id: 1, username: 'test' };
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;

            expect((router as any).navigateByUrl).toHaveBeenCalledWith('/');
        });
```

**Fixed Code:**
```typescript
it('should use navigate method with array parameter', () => {
            accountService.userValue = { id: 1, username: 'test' };
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;

            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });
```

**Fix 3: Replace** (Confidence: 95%)

Fix test to expect 1 call to navigate, matching the actual implementation

**Original Code:**
```typescript
it('should call navigate twice (only once in actual code)', () => {
            accountService.userValue = { id: 99, username: 'john' };
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;

            expect(router.navigate).toHaveBeenCalledTimes(2);
        });
```

**Fixed Code:**
```typescript
it('should call navigate once when user is logged in', () => {
            accountService.userValue = { id: 99, username: 'john' };
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;

            expect(router.navigate).toHaveBeenCalledTimes(1);
        });
```

---

</details>


### Iteration 5 (Retry 4)

- **Found:** 27 test failure(s)


### Iteration 6 (Retry 5)

- **Found:** 27 test failure(s)


### Iteration 7 (Retry 6)

- **Found:** 27 test failure(s)


### Iteration 8 (Retry 7)

- **Found:** 27 test failure(s)


### Iteration 9 (Retry 8)

- **Found:** 27 test failure(s)


### Iteration 10 (Retry 9)

- **Found:** 27 test failure(s)


### Iteration 11 (Retry 10)

- **Found:** 27 test failure(s)


## Remaining Test Failures

The following 27 test failure(s) require manual attention (max retries of 10 reached):

### Unknown (27)

#### 1. `src/app/services/account.service.spec.ts`

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

#### 2. `src/app/services/account.service.spec.ts`

**Test:** `AccountService › update() › should update user when same ID is logged in`

**Error Message:**
```
expect(received).toBe(expected) // Object.is equality
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

#### 3. `src/app/services/account.service.spec.ts`

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

#### 4. `src/app/home/home.component.spec.ts`

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

#### 5. `src/app/home/home.component.spec.ts`

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

#### 6. `src/app/home/home.component.spec.ts`

**Test:** `HomeComponent › Edge behavior › should handle case when AccountService returns null user`

**Error Message:**
```
expect(received).toContain(expected) // indexOf
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/home/home.component.spec.ts:85:41
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
      at src/app/account/layout.component.spec.ts:29:27
```

</details>

#### 8. `src/app/users/add-edit.component.spec.ts`

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

#### 9. `src/app/users/add-edit.component.spec.ts`

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

#### 10. `src/app/users/add-edit.component.spec.ts`

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

#### 11. `src/app/users/add-edit.component.spec.ts`

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

#### 12. `src/app/users/add-edit.component.spec.ts`

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

#### 13. `src/app/components/alert.component.spec.ts`

**Test:** `Console`

**Error Message:**
```
console.error
```

<details>
<summary>Stack Trace</summary>

```
            at AlertComponent.ngOnDestroy (/workspace/angular-14-test/src/app/components/alert.component.ts:52:32)
            at executeOnDestroys (/workspace/angular-14-test/node_modules/@angular/core/fesm2020/core.mjs:5976:32)
            at cleanUpView (/workspace/angular-14-test/node_modules/@angular/core/fesm2020/core.mjs:5886:9)
            at destroyViewTree (/workspace/angular-14-test/node_modules/@angular/core/fesm2020/core.mjs:5719:17)
            at destroyLView (/workspace/angular-14-test/node_modules/@angular/core/fesm2020/core.mjs:5864:9)
            at RootViewRef.destroy (/workspace/angular-14-test/node_modules/@angular/core/fesm2020/core.mjs:11804:9)
            at ComponentRef.destroy (/workspace/angular-14-test/node_modules/@angular/core/fesm2020/core.mjs:12226:23)
            at ComponentFixture.destroy (/workspace/angular-14-test/node_modules/@angular/core/fesm2020/testing.mjs:213:31)
            at /workspace/angular-14-test/node_modules/@angular/core/fesm2020/testing.mjs:24332:25
            at Array.forEach (<anonymous>)
            at TestBedImpl.destroyActiveFixtures (/workspace/angular-14-test/node_modules/@angular/core/fesm2020/testing.mjs:24330:30)
            at TestBedImpl.resetTestingModule (/workspace/angular-14-test/node_modules/@angular/core/fesm2020/testing.mjs:24154:18)
            at /workspace/angular-14-test/node_modules/@angular/core/fesm2020/testing.mjs:24498:21
            at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (/workspace/angular-14-test/node_modules/zone.js/bundles/zone.umd.js:412:30)
            at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (/workspace/angular-14-test/node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
            at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (/workspace/angular-14-test/node_modules/zone.js/bundles/zone.umd.js:411:56)
            at Zone.Object.<anonymous>.Zone.run (/workspace/angular-14-test/node_modules/zone.js/bundles/zone.umd.js:169:47)
            at Object.wrappedFunc (/workspace/angular-14-test/node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
            at Promise.then.completed (/workspace/angular-14-test/node_modules/jest-circus/build/utils.js:298:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/workspace/angular-14-test/node_modules/jest-circus/build/utils.js:231:10)
            at _callCircusHook (/workspace/angular-14-test/node_modules/jest-circus/build/run.js:281:40)
            at processTicksAndRejections (node:internal/process/task_queues:105:5)
            at _runTest (/workspace/angular-14-test/node_modules/jest-circus/build/run.js:254:5)
            at _runTestsForDescribeBlock (/workspace/angular-14-test/node_modules/jest-circus/build/run.js:126:9)
            at _runTestsForDescribeBlock (/workspace/angular-14-test/node_modules/jest-circus/build/run.js:121:9)
            at _runTestsForDescribeBlock (/workspace/angular-14-test/node_modules/jest-circus/build/run.js:121:9)
            at run (/workspace/angular-14-test/node_modules/jest-circus/build/run.js:71:3)
            at runAndTransformResultsToJestFormat (/workspace/angular-14-test/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
```

</details>

#### 14. `src/app/components/alert.component.spec.ts`

**Test:** `AlertComponent › removeAlert › should remove the alert immediately if fade is false`

**Error Message:**
```
expect(received).toBeNull()
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/components/alert.component.spec.ts:71:45
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 15. `src/app/components/alert.component.spec.ts`

**Test:** `AlertComponent › removeAlert › should remove the alert immediately if fade is false`

**Error Message:**
```
1 component threw errors during cleanup
```

<details>
<summary>Stack Trace</summary>

```
      at TestBedImpl.destroyActiveFixtures (node_modules/@angular/core/fesm2020/testing.mjs:24344:19)
      at TestBedImpl.resetTestingModule (node_modules/@angular/core/fesm2020/testing.mjs:24154:18)
      at node_modules/@angular/core/fesm2020/testing.mjs:24498:21
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 16. `src/app/components/alert.component.spec.ts`

**Test:** `AlertComponent › removeAlert › should fade out and remove alert after timeout if fade is true`

**Error Message:**
```
expect(received).toEqual(expected) // deep equality
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/components/alert.component.spec.ts:83:38
      at fakeAsyncFn (node_modules/zone.js/bundles/zone-testing.umd.js:2110:34)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 17. `src/app/components/alert.component.spec.ts`

**Test:** `AlertComponent › removeAlert › should fade out and remove alert after timeout if fade is true`

**Error Message:**
```
1 component threw errors during cleanup
```

<details>
<summary>Stack Trace</summary>

```
      at TestBedImpl.destroyActiveFixtures (node_modules/@angular/core/fesm2020/testing.mjs:24344:19)
      at TestBedImpl.resetTestingModule (node_modules/@angular/core/fesm2020/testing.mjs:24154:18)
      at node_modules/@angular/core/fesm2020/testing.mjs:24498:21
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 18. `src/app/components/alert.component.spec.ts`

**Test:** `AlertComponent › cssClass › should return correct classes for success alert`

**Error Message:**
```
1 component threw errors during cleanup
```

<details>
<summary>Stack Trace</summary>

```
      at TestBedImpl.destroyActiveFixtures (node_modules/@angular/core/fesm2020/testing.mjs:24344:19)
      at TestBedImpl.resetTestingModule (node_modules/@angular/core/fesm2020/testing.mjs:24154:18)
      at node_modules/@angular/core/fesm2020/testing.mjs:24498:21
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 19. `src/app/components/alert.component.spec.ts`

**Test:** `AlertComponent › cssClass › should not break when alert is undefined`

**Error Message:**
```
expect(received).toEqual(expected) // deep equality
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/components/alert.component.spec.ts:98:25
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 20. `src/app/components/alert.component.spec.ts`

**Test:** `AlertComponent › cssClass › should not break when alert is undefined`

**Error Message:**
```
1 component threw errors during cleanup
```

<details>
<summary>Stack Trace</summary>

```
      at TestBedImpl.destroyActiveFixtures (node_modules/@angular/core/fesm2020/testing.mjs:24344:19)
      at TestBedImpl.resetTestingModule (node_modules/@angular/core/fesm2020/testing.mjs:24154:18)
      at node_modules/@angular/core/fesm2020/testing.mjs:24498:21
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 21. `src/app/services/alert.service.spec.ts`

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

#### 22. `src/app/services/alert.service.spec.ts`

**Test:** `AlertService › onAlert() › should not emit if alert id does not match`

**Error Message:**
```
expect(jest.fn()).toHaveBeenCalled()
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/services/alert.service.spec.ts:36:19
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 23. `src/app/services/alert.service.spec.ts`

**Test:** `AlertService › convenience methods › should emit error alert with message and type`

**Error Message:**
```
expect(received).toBe(expected) // Object.is equality
```

<details>
<summary>Stack Trace</summary>

```
      at Object.next (src/app/services/alert.service.spec.ts:78:27)
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
      at src/app/services/alert.service.spec.ts:82:15
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 24. `src/app/services/alert.service.spec.ts`

**Test:** `AlertService › convenience methods › should emit error alert with message and type`

**Error Message:**
```
thrown: "Exceeded timeout of 5000 ms for a test while waiting for `done()` to be called.
```

<details>
<summary>Stack Trace</summary>

```
      at context.<computed> (node_modules/zone.js/bundles/zone-testing.umd.js:841:39)
      at src/app/services/alert.service.spec.ts:75:5
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at node_modules/zone.js/bundles/zone-testing.umd.js:780:33
      at context.<computed> (node_modules/zone.js/bundles/zone-testing.umd.js:823:39)
      at src/app/services/alert.service.spec.ts:64:3
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at node_modules/zone.js/bundles/zone-testing.umd.js:780:33
      at context.<computed> (node_modules/zone.js/bundles/zone-testing.umd.js:823:39)
      at Object.<anonymous> (src/app/services/alert.service.spec.ts:4:1)
```

</details>

#### 25. `src/app/services/alert.service.spec.ts`

**Test:** `AlertService › clear() › should not emit when id does not match`

**Error Message:**
```
expect(jest.fn()).toHaveBeenCalled()
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/services/alert.service.spec.ts:114:19
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 26. `src/app/services/alert.service.spec.ts`

**Test:** `AlertService › Behavior nuances › should handle multiple subscribers independently`

**Error Message:**
```
expect(jest.fn()).not.toHaveBeenCalled()
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/services/alert.service.spec.ts:131:29
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 27. `src/app/services/alert.service.spec.ts`

**Test:** `AlertService › Behavior nuances › should not throw when clearing before any alert emitted`

**Error Message:**
```
expect(received).toThrowError()
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/services/alert.service.spec.ts:136:46
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

---
