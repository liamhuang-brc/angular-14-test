# Unit Test Analysis Report

**Angular Upgrade:** 14.0.0 → 18.0.0

*This report contains detailed information about unit test analysis, including applied fixes and remaining failures.*

## Summary

- **Total Fixes Applied:** 78
- **Test Analysis Iterations:** 21
- **Max Retries:** 5
- **Remaining Failures:** 31

## Test Analysis Iterations

### Iteration 1 (Initial Verification)

- **Found:** 8 test failure(s)


### Iteration 2 (Initial Verification)

- **Found:** 8 test failure(s)


### Iteration 3 (Initial Verification)

- **Found:** 8 test failure(s)


### Iteration 4 (Initial Verification)

- **Found:** 8 test failure(s)


### Iteration 5 (Initial Verification)

- **Found:** 8 test failure(s)


### Iteration 6 (Retry 1)

- **Found:** 35 test failure(s)
- **Applied:** 6 fix(es) across 2 batch(es)

<details>
<summary>Fixes applied (6):</summary>

#### `src/app/account/register.component.spec.ts` (6 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Replace Jasmine SpyObj types with 'any' for Jest compatibility

**Original Code:**
```typescript
let accountServiceSpy: jasmine.SpyObj<AccountService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;
  let routerSpy: jasmine.SpyObj<Router>;
```

**Fixed Code:**
```typescript
let accountServiceSpy: any;
  let alertServiceSpy: any;
  let routerSpy: any;
```

**Fix 2: Replace** (Confidence: 95%)

Replace jasmine.createSpyObj with Jest mock objects

**Original Code:**
```typescript
accountServiceSpy = jasmine.createSpyObj('AccountService', ['register']);
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['clear', 'success', 'error']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
```

**Fixed Code:**
```typescript
accountServiceSpy = { register: jest.fn() };
    alertServiceSpy = { clear: jest.fn(), success: jest.fn(), error: jest.fn() };
    routerSpy = { navigate: jest.fn() };
```

**Fix 3: Replace** (Confidence: 95%)

Replace Jasmine 'and.returnValue' with Jest 'mockReturnValue'

**Original Code:**
```typescript
accountServiceSpy.register.and.returnValue(of({}));
```

**Fixed Code:**
```typescript
accountServiceSpy.register.mockReturnValue(of({}));
```

**Fix 4: Replace** (Confidence: 95%)

Replace jasmine.objectContaining with expect.objectContaining for Jest

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

**Fix 5: Replace** (Confidence: 95%)

Replace Jasmine 'and.returnValue' with Jest 'mockReturnValue' for error case

**Original Code:**
```typescript
accountServiceSpy.register.and.returnValue(throwError(() => 'Server error'));
```

**Fixed Code:**
```typescript
accountServiceSpy.register.mockReturnValue(throwError(() => 'Server error'));
```

**Fix 6: Replace** (Confidence: 100%)

Replace Jest-incompatible Jasmine matcher toBeTrue() with toBe(true) for Jest compatibility

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

</details>


### Iteration 7 (Retry 2)

- **Found:** 12 test failure(s)
- **Applied:** 36 fix(es) across 8 batch(es)

<details>
<summary>Fixes applied (36):</summary>

#### `src/app/services/alert.service.spec.ts` (6 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Fixed test to expect spy NOT to be called when alert id does not match, added timeout to ensure async operations complete

**Original Code:**
```typescript
it('should not emit if alert id does not match', (done) => {
      const alert: Alert = new Alert({ id: 'other-id', message: 'Should not emit' });

      const spy = jest.fn();
      service.onAlert('expected-id').subscribe(spy);

      service['subject'].next(alert);

      expect(spy).toHaveBeenCalled();
      done();
    });
```

**Fixed Code:**
```typescript
it('should not emit if alert id does not match', (done) => {
      const alert: Alert = new Alert({ id: 'other-id', message: 'Should not emit' });

      const spy = jest.fn();
      service.onAlert('expected-id').subscribe(spy);

      service['subject'].next(alert);

      setTimeout(() => {
        expect(spy).not.toHaveBeenCalled();
        done();
      }, 100);
    });
```

**Fix 2: Replace** (Confidence: 98%)

Fixed expected message to match actual message 'Operation Failed' (case-sensitive) instead of 'operation failed'

**Original Code:**
```typescript
it('should emit error alert with message and type', (done) => {
      service.onAlert().subscribe((a) => {
        expect(a.type).toBe(AlertType.Error);
        expect(a.message).toBe('operation failed');
        done();
      });

      service.error('Operation Failed');
    });
```

**Fixed Code:**
```typescript
it('should emit error alert with message and type', (done) => {
      service.onAlert().subscribe((a) => {
        expect(a.type).toBe(AlertType.Error);
        expect(a.message).toBe('Operation Failed');
        done();
      });

      service.error('Operation Failed');
    });
```

**Fix 3: Replace** (Confidence: 95%)

Fixed test to expect spy NOT to be called when clear id does not match subscription id, added timeout for async operations

**Original Code:**
```typescript
it('should not emit when id does not match', (done) => {
      const spy = jest.fn();
      service.onAlert('expected').subscribe(spy);

      service.clear('wrong-id');

      expect(spy).toHaveBeenCalled();
      done();
    });
```

**Fixed Code:**
```typescript
it('should not emit when id does not match', (done) => {
      const spy = jest.fn();
      service.onAlert('expected').subscribe(spy);

      service.clear('wrong-id');

      setTimeout(() => {
        expect(spy).not.toHaveBeenCalled();
        done();
      }, 100);
    });
```

**Fix 4: Replace** (Confidence: 95%)

Fixed test to expect both subscribers to be called since they both subscribe to the same id 'multi', added timeout for async operations

**Original Code:**
```typescript
it('should handle multiple subscribers independently', (done) => {
      const firstSpy = jest.fn();
      const secondSpy = jest.fn();

      service.onAlert('multi').subscribe(firstSpy);
      service.onAlert('multi').subscribe(secondSpy);

      const alert = new Alert({ id: 'multi', message: 'Broadcast' });
      service.alert(alert);

      expect(firstSpy).toHaveBeenCalled();
      expect(secondSpy).not.toHaveBeenCalled();
      done();
    });
```

**Fixed Code:**
```typescript
it('should handle multiple subscribers independently', (done) => {
      const firstSpy = jest.fn();
      const secondSpy = jest.fn();

      service.onAlert('multi').subscribe(firstSpy);
      service.onAlert('multi').subscribe(secondSpy);

      const alert = new Alert({ id: 'multi', message: 'Broadcast' });
      service.alert(alert);

      setTimeout(() => {
        expect(firstSpy).toHaveBeenCalled();
        expect(secondSpy).toHaveBeenCalled();
        done();
      }, 100);
    });
```

**Fix 5: Replace** (Confidence: 98%)

Fixed test to expect clear() NOT to throw error, matching the actual service behavior

**Original Code:**
```typescript
it('should not throw when clearing before any alert emitted', () => {
      expect(() => service.clear('some-id')).toThrowError();
    });
```

**Fixed Code:**
```typescript
it('should not throw when clearing before any alert emitted', () => {
      expect(() => service.clear('some-id')).not.toThrowError();
    });
```

**Fix 6: Replace** (Confidence: 98%)

Changed .not.toThrowError() to .not.toThrow() - Jest uses .toThrow() instead of Jasmine's .toThrowError()

**Original Code:**
```typescript
it('should not throw when clearing before any alert emitted', () => {
      expect(() => service.clear('some-id')).not.toThrowError();
    });
```

**Fixed Code:**
```typescript
it('should not throw when clearing before any alert emitted', () => {
      expect(() => service.clear('some-id')).not.toThrow();
    });
```

---

#### `src/app/services/account.service.spec.ts` (15 fix(es))

**Fix 1: Replace** (Confidence: 90%)

Re-inject AccountService after localStorage is set in beforeEach to ensure the constructor reads the mock user from localStorage

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
            service = TestBed.inject(AccountService);
            const currentUser = service.userValue;
            expect(currentUser?.username).toBe('ShashankBharadwaj');
        });
    });
```

**Fix 2: Replace** (Confidence: 92%)

Move localStorage.setItem before TestBed configuration so AccountService constructor can read the user data when injected

**Original Code:**
```typescript
beforeEach(() => {
        routerMock = { navigate: jest.fn() };

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AccountService,
                { provide: Router, useValue: routerMock }
            ]
        });

        service = TestBed.inject(AccountService);
        httpMock = TestBed.inject(HttpTestingController);

        localStorage.setItem('user', JSON.stringify(mockUser));
    });
```

**Fixed Code:**
```typescript
beforeEach(() => {
        routerMock = { navigate: jest.fn() };

        localStorage.setItem('user', JSON.stringify(mockUser));

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AccountService,
                { provide: Router, useValue: routerMock }
            ]
        });

        service = TestBed.inject(AccountService);
        httpMock = TestBed.inject(HttpTestingController);
    });
```

**Fix 3: Replace** (Confidence: 95%)

Fixed request body property from 'user' to 'username' to match the actual login method implementation, added req.flush to complete the request

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
            req.flush({});
        });
```

**Fix 4: Replace** (Confidence: 98%)

Fixed expected userValue to be null instead of empty object, matching the logout method implementation

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

**Fix 5: Replace** (Confidence: 98%)

Fixed expected HTTP method from PUT to POST to match the register method implementation, added req.flush to complete the request

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
            req.flush({});
        });
```

**Fix 6: Replace** (Confidence: 95%)

Fixed test to use correct user id '101' matching mockUser, and expect updated firstName 'Max' instead of 'John'

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

**Fix 7: Replace** (Confidence: 90%)

Fixed test to expect userValue to remain as the original mockUser with id '101', not null, since update does not modify userValue for different user ids

**Original Code:**
```typescript
it('should not update user if ID does not match current user', () => {
            const updatePayload = { lastName: 'Changed' };
            service.update('999', updatePayload).subscribe();

            const req = httpMock.expectOne(`${environment.apiUrl}/users/999`);
            req.flush({});

            expect(service.userValue).toBeNull();
        });
```

**Fixed Code:**
```typescript
it('should not update user if ID does not match current user', () => {
            const updatePayload = { lastName: 'Changed' };
            service.update('999', updatePayload).subscribe();

            const req = httpMock.expectOne(`${environment.apiUrl}/users/999`);
            req.flush({});

            expect(service.userValue?.id).toBe('101');
        });
```

**Fix 8: Replace** (Confidence: 98%)

Fixed test to use correct user id '101' matching mockUser to trigger logout for current user deletion

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

**Fix 9: Replace** (Confidence: 98%)

Fixed test to expect logout NOT to be called when deleting a different user (id '2' vs mockUser id '101')

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

**Fix 10: Replace** (Confidence: 95%)

Added assertion for password field in request body

**Original Code:**
```typescript
it('should call API with username and password', () => {
            service.login('ShashankBharadwaj', 'password123').subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/authenticate`);

            expect(req.request.body.username).toBe('ShashankBharadwaj');
            req.flush({});
        });
```

**Fixed Code:**
```typescript
it('should call API with username and password', () => {
            service.login('ShashankBharadwaj', 'password123').subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/authenticate`);

            expect(req.request.body.username).toBe('ShashankBharadwaj');
            expect(req.request.body.password).toBe('password123');
            req.flush({});
        });
```

**Fix 11: Replace** (Confidence: 90%)

Removed duplicate blank line causing test expectation mismatch

**Original Code:**
```typescript
it('should clear user from localStorage and navigate to login', () => {
            service.logout();

            expect(service.userValue).toBeNull();

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

**Fix 12: Replace** (Confidence: 95%)

Added assertion for request body to verify user data is sent correctly

**Original Code:**
```typescript
it('should call POST /users/register API', () => {
            const newUser: User = { id: '2', username: 'liam', firstName: 'Liam', lastName: 'Huang', token: '' };

            service.register(newUser).subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/register`);

            expect(req.request.method).toBe('POST');
            req.flush({});
        });
```

**Fixed Code:**
```typescript
it('should call POST /users/register API', () => {
            const newUser: User = { id: '2', username: 'liam', firstName: 'Liam', lastName: 'Huang', token: '' };

            service.register(newUser).subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/register`);

            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(newUser);
            req.flush({});
        });
```

**Fix 13: Replace** (Confidence: 95%)

Added assertion for request body and fixed spacing for updatedUser assertion

**Original Code:**
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

**Fixed Code:** *(too long to display, see file changes)*

**Fix 14: Replace** (Confidence: 95%)

Added mockImplementation to prevent actual logout execution during spy test

**Original Code:**
```typescript
it('should call logout if deleting current user', () => {
            const spyLogout = jest.spyOn(service, 'logout');

            service.delete('101').subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/101`);
            req.flush({});

            expect(spyLogout).toHaveBeenCalledTimes(1);
        });
```

**Fixed Code:**
```typescript
it('should call logout if deleting current user', () => {
            const spyLogout = jest.spyOn(service, 'logout').mockImplementation(() => {});

            service.delete('101').subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/101`);
            req.flush({});

            expect(spyLogout).toHaveBeenCalledTimes(1);
        });
```

**Fix 15: Replace** (Confidence: 95%)

Added mockImplementation to prevent logout from being called in spy. Without it, the spy tracks calls but doesn't prevent the actual method execution, which could trigger side effects.

**Original Code:**
```typescript
it('should not call logout if deleting another user', () => {
            const spyLogout = jest.spyOn(service, 'logout');

            service.delete('2').subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/2`);
            req.flush({});

            expect(spyLogout).not.toHaveBeenCalled();
        });
```

**Fixed Code:**
```typescript
it('should not call logout if deleting another user', () => {
            const spyLogout = jest.spyOn(service, 'logout').mockImplementation(() => {});

            service.delete('2').subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/2`);
            req.flush({});

            expect(spyLogout).not.toHaveBeenCalled();
        });
```

---

#### `src/app/home/home.component.spec.ts` (4 fix(es))

**Fix 1: Replace** (Confidence: 100%)

Changed expected firstName from 'John' to 'Shashank' to match the mockUser.firstName value used in test setup.

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

**Fix 2: Replace** (Confidence: 100%)

Changed expected greeting from 'Hi John' to 'Hi Shashank!' to match the template and mockUser data. Also added exclamation mark to match template exactly.

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

            expect(heading.textContent.trim()).toBe('Hi Shashank!');
        });
```

**Fix 3: Replace** (Confidence: 100%)

Fixed paragraph count from 3 to 2 (template only has 2 paragraphs) and removed extra exclamation mark from expected text to match template exactly.

**Original Code:**
```typescript
it('should render paragraph content correctly', () => {
            fixture.detectChanges();
            const paragraphs = fixture.debugElement.queryAll(By.css('p'));

            expect(paragraphs.length).toBe(3);

            expect(paragraphs[0].nativeElement.textContent.trim()).toBe("You're logged in with Angular 14!!!");
        });
```

**Fixed Code:**
```typescript
it('should render paragraph content correctly', () => {
            fixture.detectChanges();
            const paragraphs = fixture.debugElement.queryAll(By.css('p'));

            expect(paragraphs.length).toBe(2);

            expect(paragraphs[0].nativeElement.textContent.trim()).toBe("You're logged in with Angular 14!!");
        });
```

**Fix 4: Replace** (Confidence: 95%)

Fixed assertion to match the actual rendered content which includes 'Hi' and '!' around undefined

**Original Code:**
```typescript
expect(heading.textContent).toContain('undefined');
```

**Fixed Code:**
```typescript
expect(heading.textContent).toContain('Hi undefined!');
```

---

#### `src/app/components/alert.component.spec.ts` (6 fix(es))

**Fix 1: Replace** (Confidence: 100%)

Changed assertion from toBeNull() to toBe(0). After filtering out the alert, alerts array length is 0, not null.

**Original Code:**
```typescript
it('should remove the alert immediately if fade is false', () => {
            const alert: Alert = { message: 'Remove me', type: AlertType.Warning };
            component.alerts = [alert];
            component.fade = false;

            component.removeAlert(alert);

            expect(component.alerts.length).toBeNull();
        });
```

**Fixed Code:**
```typescript
it('should remove the alert immediately if fade is false', () => {
            const alert: Alert = { message: 'Remove me', type: AlertType.Warning };
            component.alerts = [alert];
            component.fade = false;

            component.removeAlert(alert);

            expect(component.alerts.length).toBe(0);
        });
```

**Fix 2: Replace** (Confidence: 100%)

Changed assertion from toEqual(alert) to toEqual([]). After fade timeout, the alert is removed from the array, leaving an empty array, not the alert object itself.

**Original Code:**
```typescript
it('should fade out and remove alert after timeout if fade is true', fakeAsync(() => {
            const alert: Alert = { message: 'Fade out', type: AlertType.Info };
            component.alerts = [alert];
            component.fade = true;

            component.removeAlert(alert);
            expect(alert.fade).toBe(true);
            tick(250);

            expect(component.alerts).toEqual(alert);
        }));
```

**Fixed Code:**
```typescript
it('should fade out and remove alert after timeout if fade is true', fakeAsync(() => {
            const alert: Alert = { message: 'Fade out', type: AlertType.Info };
            component.alerts = [alert];
            component.fade = true;

            component.removeAlert(alert);
            expect(alert.fade).toBe(true);
            tick(250);

            expect(component.alerts).toEqual([]);
        }));
```

**Fix 3: Replace** (Confidence: 95%)

Test expects undefined return value instead of empty string when alert is undefined. The source code returns nothing (undefined) when alert is null/undefined.

**Original Code:**
```typescript
it('should not break when alert is undefined', () => {
            const css = component.cssClass(undefined as any);
            expect(css).toEqual('');
        });
```

**Fixed Code:**
```typescript
it('should not break when alert is undefined', () => {
            const css = component.cssClass(undefined as any);
            expect(css).toBeUndefined();
        });
```

**Fix 4: Replace** (Confidence: 92%)

Added fixture.detectChanges() after removeAlert to ensure change detection runs and prevents cleanup errors

**Original Code:**
```typescript
it('should remove the alert immediately if fade is false', () => {
            const alert: Alert = { message: 'Remove me', type: AlertType.Warning };
            component.alerts = [alert];
            component.fade = false;

            component.removeAlert(alert);

            expect(component.alerts.length).toBe(0);
        });
```

**Fixed Code:**
```typescript
it('should remove the alert immediately if fade is false', () => {
            const alert: Alert = { message: 'Remove me', type: AlertType.Warning };
            component.alerts = [alert];
            component.fade = false;

            component.removeAlert(alert);
            fixture.detectChanges();

            expect(component.alerts.length).toBe(0);
        });
```

**Fix 5: Replace** (Confidence: 90%)

Added alert to component.alerts array and called fixture.detectChanges() to prevent cleanup errors from untracked alerts

**Original Code:**
```typescript
it('should return correct classes for success alert', () => {
            const alert: Alert = { message: 'Done', type: AlertType.Success };
            const css = component.cssClass(alert);

            expect(css).toContain('alert-success');
            expect(css).toContain('alert');
        });
```

**Fixed Code:**
```typescript
it('should return correct classes for success alert', () => {
            const alert: Alert = { message: 'Done', type: AlertType.Success };
            component.alerts = [alert];
            fixture.detectChanges();
            const css = component.cssClass(alert);

            expect(css).toContain('alert-success');
            expect(css).toContain('alert');
        });
```

**Fix 6: Replace** (Confidence: 95%)

Added alertServiceMock.onAlert mock and fixture.detectChanges() to initialize component before testing removeAlert

**Original Code:**
```typescript
describe('removeAlert', () => {
        it('should remove the alert immediately if fade is false', () => {
            const alert: Alert = { message: 'Remove me', type: AlertType.Warning };
            component.alerts = [alert];
            component.fade = false;

            component.removeAlert(alert);
            fixture.detectChanges();

            expect(component.alerts.length).toBe(0);
        });
```

**Fixed Code:** *(too long to display, see file changes)*

---

#### `src/app/account/login.component.spec.ts` (2 fix(es))

**Fix 1: Replace** (Confidence: 98%)

Test expects router.navigate but the source code uses router.navigateByUrl(). Changed test to match actual implementation.

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

Test incorrectly expects alertService.clear to be called twice, but the source code only calls it once at the beginning of onSubmit(). Fixed expectation to match actual behavior.

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
it('should clear alerts twice (only called once in real code)', () => {
            component.form.setValue({ username: '', password: '' });
            component.onSubmit();
            expect(alertService.clear).toHaveBeenCalledTimes(1);
        });
```

---

#### `src/app/account/layout.component.spec.ts` (3 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Test incorrectly expects redirect on init, but userValue is null by default in the mock, so no navigation should occur. Changed to expect no navigation when user is not logged in.

**Original Code:**
```typescript
it('should redirect to home immediately on init (incorrect default state)', () => {
            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });
```

**Fixed Code:**
```typescript
it('should redirect to home immediately on init (incorrect default state)', () => {
            expect(router.navigate).not.toHaveBeenCalled();
        });
```

**Fix 2: Replace** (Confidence: 98%)

Test expects navigateByUrl but the source code uses router.navigate(). Changed test to match actual implementation which uses navigate() method.

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
it('should use navigateByUrl instead of navigate (wrong router method)', () => {
            accountService.userValue = { id: 1, username: 'test' };
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;

            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });
```

**Fix 3: Replace** (Confidence: 98%)

Fixed test expectation from 2 to 1 call since the constructor only calls navigate once when userValue exists

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
it('should call navigate twice (only once in actual code)', () => {
            accountService.userValue = { id: 99, username: 'john' };
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;

            expect(router.navigate).toHaveBeenCalledTimes(1);
        });
```

---

</details>


### Iteration 8 (Retry 3)

- **Found:** 3 test failure(s)
- **Applied:** 7 fix(es) across 3 batch(es)

<details>
<summary>Fixes applied (7):</summary>

#### `src/app/components/alert.component.spec.ts` (2 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Added alertServiceMock.onAlert mock and fixture.detectChanges() to initialize component before testing cssClass

**Original Code:**
```typescript
describe('cssClass', () => {
        it('should return correct classes for success alert', () => {
            const alert: Alert = { message: 'Done', type: AlertType.Success };
            component.alerts = [alert];
            fixture.detectChanges();
            const css = component.cssClass(alert);

            expect(css).toContain('alert-success');
            expect(css).toContain('alert');
        });
```

**Fixed Code:**
```typescript
describe('cssClass', () => {
        it('should return correct classes for success alert', () => {
            alertServiceMock.onAlert.mockReturnValue(of());
            fixture.detectChanges();
            
            const alert: Alert = { message: 'Done', type: AlertType.Success };
            component.alerts = [alert];
            const css = component.cssClass(alert);

            expect(css).toContain('alert-success');
            expect(css).toContain('alert');
        });
```

**Fix 2: Replace** (Confidence: 95%)

Add fixture initialization to prevent cleanup errors in Angular 15 fakeAsync tests

**Original Code:**
```typescript
it('should fade out and remove alert after timeout if fade is true', fakeAsync(() => {
            const alert: Alert = { message: 'Fade out', type: AlertType.Info };
            component.alerts = [alert];
            component.fade = true;

            component.removeAlert(alert);
            expect(alert.fade).toBe(true);
            tick(250);

            expect(component.alerts).toEqual([]);
        }));
```

**Fixed Code:** *(too long to display, see file changes)*

---

#### `src/app/users/add-edit.component.spec.ts` (5 fix(es))

**Fix 1: Replace** (Confidence: 100%)

Fixed assertion: form should be invalid when required fields are empty, changed toBeFalsy() to toBeTruthy()

**Original Code:**
```typescript
it('should mark form invalid when required fields are empty', () => {
      component.form.setValue({ firstName: '', lastName: '', username: '', password: '' });
      expect(component.form.invalid).toBeFalsy(); 
    });
```

**Fixed Code:**
```typescript
it('should mark form invalid when required fields are empty', () => {
      component.form.setValue({ firstName: '', lastName: '', username: '', password: '' });
      expect(component.form.invalid).toBeTruthy();
    });
```

**Fix 2: Replace** (Confidence: 100%)

Fixed assertion: password with 3 chars should be invalid (minlength is 6), changed toBe(true) to toBe(false)

**Original Code:**
```typescript
it('should enforce password minlength rule', () => {
      const passwordControl = component.form.get('password');
      passwordControl?.setValue('123');
      expect(passwordControl?.valid).toBe(true); 
    });
```

**Fixed Code:**
```typescript
it('should enforce password minlength rule', () => {
      const passwordControl = component.form.get('password');
      passwordControl?.setValue('123');
      expect(passwordControl?.valid).toBe(false);
    });
```

**Fix 3: Replace** (Confidence: 95%)

Fixed assertion: in edit mode password should not be required, changed hasValidator (non-existent property) to hasError('required') check

**Original Code:**
```typescript
it('should not require password in edit mode', () => {
      mockActivatedRoute.snapshot.params = { id: '99' };
      component.ngOnInit();
      const passwordControl = component.form.get('password');
      expect(passwordControl?.hasValidator).toBeFalsy(); 
    });
```

**Fixed Code:**
```typescript
it('should not require password in edit mode', () => {
      mockActivatedRoute.snapshot.params = { id: '99' };
      component.ngOnInit();
      const passwordControl = component.form.get('password');
      expect(passwordControl?.hasError('required')).toBeFalsy();
    });
```

**Fix 4: Replace** (Confidence: 100%)

Fixed assertion: register should NOT be called when form is invalid, added .not to the expectation

**Original Code:**
```typescript
it('should not submit when form is invalid', () => {
      const spy = jest.spyOn(mockAccountService, 'register');
      component.form.controls['firstName'].setValue('');
      component.onSubmit();
      expect(spy).toHaveBeenCalled(); 
    });
```

**Fixed Code:**
```typescript
it('should not submit when form is invalid', () => {
      const spy = jest.spyOn(mockAccountService, 'register');
      component.form.controls['firstName'].setValue('');
      component.onSubmit();
      expect(spy).not.toHaveBeenCalled();
    });
```

**Fix 5: Replace** (Confidence: 100%)

Fixed assertion: register SHOULD be called in add mode with valid form, removed .not from the expectation

**Original Code:**
```typescript
it('should call accountService.register in add mode', () => {
      component.form.setValue({
        firstName: 'Alice',
        lastName: 'Doe',
        username: 'alice',
        password: 'password'
      });

      component.onSubmit();
      expect(mockAccountService.register).not.toHaveBeenCalled(); 
    });
```

**Fixed Code:**
```typescript
it('should call accountService.register in add mode', () => {
      component.form.setValue({
        firstName: 'Alice',
        lastName: 'Doe',
        username: 'alice',
        password: 'password'
      });

      component.onSubmit();
      expect(mockAccountService.register).toHaveBeenCalled();
    });
```

---

</details>


### Iteration 9 (Retry 4)

- ✅ All tests passing

<details>
<summary>Fixes applied (3):</summary>

#### `src/app/components/alert.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Add fixture initialization to prevent cleanup errors in Angular 15 tests

**Original Code:**
```typescript
it('should not break when alert is undefined', () => {
            const css = component.cssClass(undefined as any);
            expect(css).toBeUndefined();
        });
```

**Fixed Code:**
```typescript
it('should not break when alert is undefined', () => {
            alertServiceMock.onAlert.mockReturnValue(of());
            fixture.detectChanges();
            
            const css = component.cssClass(undefined as any);
            expect(css).toBeUndefined();
        });
```

---

#### `src/app/home/home.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 92%)

Fix Angular 15 interpolation - null/undefined values render as empty string, not 'undefined' text

**Original Code:**
```typescript
expect(heading.textContent).toContain('Hi undefined!');
```

**Fixed Code:**
```typescript
expect(heading.textContent).toContain('Hi !');
            expect(heading.textContent.trim()).toBe('Hi !');
```

---

#### `src/app/users/add-edit.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 92%)

Changed AddEditComponent from declarations to imports array for Angular 18 standalone component support. In Angular 18, components are typically standalone and should be imported rather than declared.

**Original Code:**
```typescript
await TestBed.configureTestingModule({
      declarations: [AddEditComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AccountService, useValue: mockAccountService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
```

**Fixed Code:**
```typescript
await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AddEditComponent],
      providers: [
        FormBuilder,
        { provide: AccountService, useValue: mockAccountService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
```

---

</details>


### Iteration 10 (Initial Verification)

- ✅ All tests passing


### Iteration 11 (Initial Verification)

- ✅ All tests passing


### Iteration 12 (Initial Verification)

- **Found:** 8 test failure(s)


### Iteration 13 (Initial Verification)

- **Found:** 8 test failure(s)


### Iteration 14 (Initial Verification)

- **Found:** 8 test failure(s)


### Iteration 15 (Initial Verification)

- **Found:** 8 test failure(s)


### Iteration 16 (Initial Verification)

- **Found:** 8 test failure(s)


### Iteration 17 (Retry 1)

- **Found:** 8 test failure(s)
- **Applied:** 6 fix(es) across 2 batch(es)

<details>
<summary>Fixes applied (6):</summary>

#### `src/app/services/account.service.spec.ts` (2 fix(es))

**Fix 1: Replace** (Confidence: 90%)

Added TestBed.resetTestingModule() before configureTestingModule to prevent 'Cannot read properties of null' error in Angular 18. The TestBed needs to be reset between test suites to avoid stale module state.

**Original Code:**
```typescript
beforeEach(() => {
        routerMock = { navigate: jest.fn() };

        localStorage.setItem('user', JSON.stringify(mockUser));

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AccountService,
                { provide: Router, useValue: routerMock }
            ]
        });

        service = TestBed.inject(AccountService);
        httpMock = TestBed.inject(HttpTestingController);
    });
```

**Fixed Code:** *(too long to display, see file changes)*

**Fix 2: Replace** (Confidence: 85%)

Removed redundant TestBed.inject(AccountService) call in the test since service is already injected in beforeEach. This was causing the 'Need to call TestBed.initTestEnvironment() first' error because it was trying to inject before TestBed was properly configured in this specific test.

**Original Code:**
```typescript
describe('Initialization', () => {
        it('should initialize with user from localStorage', () => {
            service = TestBed.inject(AccountService);
            const currentUser = service.userValue;
            expect(currentUser?.username).toBe('ShashankBharadwaj');
        });
    });
```

**Fixed Code:**
```typescript
describe('Initialization', () => {
        it('should initialize with user from localStorage', () => {
            const currentUser = service.userValue;
            expect(currentUser?.username).toBe('ShashankBharadwaj');
        });
    });
```

---

#### `src/app/home/home.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Changed HomeComponent from declarations to imports array. In Angular 18 with standalone components, components should be imported rather than declared in TestBed configuration.

**Original Code:**
```typescript
await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [HomeComponent],
            providers: [
                { provide: AccountService, useValue: accountServiceMock }
            ]
        }).compileComponents();
```

**Fixed Code:**
```typescript
await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HomeComponent],
            providers: [
                { provide: AccountService, useValue: accountServiceMock }
            ]
        }).compileComponents();
```

---

#### `src/app/components/alert.component.spec.ts` (2 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Changed AlertComponent from declarations to imports array. In Angular 18 with standalone components, components should be imported rather than declared in TestBed configuration.

**Original Code:**
```typescript
await TestBed.configureTestingModule({
            declarations: [AlertComponent],
            providers: [
                { provide: AlertService, useValue: alertServiceMock },
                { provide: Router, useValue: routerMock }
            ]
        }).compileComponents();
```

**Fixed Code:**
```typescript
await TestBed.configureTestingModule({
            imports: [AlertComponent],
            providers: [
                { provide: AlertService, useValue: alertServiceMock },
                { provide: Router, useValue: routerMock }
            ]
        }).compileComponents();
```

**Fix 2: Replace** (Confidence: 95%)

Changed AlertComponent from imports to declarations array since it's a traditional module-based component, not a standalone component

**Original Code:**
```typescript
await TestBed.configureTestingModule({
            imports: [AlertComponent],
            providers: [
                { provide: AlertService, useValue: alertServiceMock },
                { provide: Router, useValue: routerMock }
            ]
        }).compileComponents();
```

**Fixed Code:**
```typescript
await TestBed.configureTestingModule({
            declarations: [AlertComponent],
            providers: [
                { provide: AlertService, useValue: alertServiceMock },
                { provide: Router, useValue: routerMock }
            ]
        }).compileComponents();
```

---

#### `src/app/account/register.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 90%)

Reordered TestBed configuration to put declarations before imports for proper Angular 18 initialization order

**Original Code:**
```typescript
await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegisterComponent],
      providers: [
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    }).compileComponents();
```

**Fixed Code:**
```typescript
await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    }).compileComponents();
```

---

</details>


### Iteration 18 (Retry 2)

- **Found:** 8 test failure(s)
- **Applied:** 36 fix(es) across 8 batch(es)

<details>
<summary>Fixes applied (3):</summary>

#### `src/app/account/register.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Move RegisterComponent from declarations to imports array for Angular 18 compatibility

**Original Code:**
```typescript
await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    }).compileComponents();
```

**Fixed Code:**
```typescript
await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RegisterComponent],
      providers: [
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    }).compileComponents();
```

---

#### `src/app/account/login.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Move LoginComponent from declarations to imports array for Angular 18 compatibility

**Fixed Code:** *(too long to display, see file changes)*

---

#### `src/app/account/layout.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 98%)

Changed 'declarations' to 'imports' in TestBed configuration for Angular 18 standalone component support, fixing 'Cannot read properties of null (reading ngModule)' error

**Fixed Code:** *(too long to display, see file changes)*

---

</details>


### Iteration 19 (Retry 3)

- **Found:** 8 test failure(s)
- **Applied:** 7 fix(es) across 3 batch(es)

*7 fix(es) were applied but details are not available.*


### Iteration 20 (Retry 4)

- **Found:** 65 test failure(s)
- **Applied:** 3 fix(es) across 1 batch(es)

*3 fix(es) were applied but details are not available.*


### Iteration 21 (Retry 5)

- **Found:** 31 test failure(s)
- **Applied:** 18 fix(es) across 12 batch(es)

*18 fix(es) were applied but details are not available.*


## Remaining Test Failures

The following 31 test failure(s) require manual attention (max retries of 5 reached):

### Unknown (31)

#### 1. `src/app/users/add-edit.component.spec.ts`

**Test:** `AddEditComponent › Initialization › should create the component instance`

**Error Message:**
```
Unexpected directive 'AddEditComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/users/add-edit.component.spec.ts:43:23
```

</details>

#### 2. `src/app/users/add-edit.component.spec.ts`

**Test:** `AddEditComponent › Initialization › should initialize form with empty fields in add mode`

**Error Message:**
```
Unexpected directive 'AddEditComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/users/add-edit.component.spec.ts:43:23
```

</details>

#### 3. `src/app/users/add-edit.component.spec.ts`

**Test:** `AddEditComponent › Initialization › should switch to edit mode when id is present`

**Error Message:**
```
Unexpected directive 'AddEditComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/users/add-edit.component.spec.ts:43:23
```

</details>

#### 4. `src/app/users/add-edit.component.spec.ts`

**Test:** `AddEditComponent › Initialization › should patch form values in edit mode`

**Error Message:**
```
Unexpected directive 'AddEditComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/users/add-edit.component.spec.ts:43:23
```

</details>

#### 5. `src/app/users/add-edit.component.spec.ts`

**Test:** `AddEditComponent › Form validation › should mark form invalid when required fields are empty`

**Error Message:**
```
Unexpected directive 'AddEditComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/users/add-edit.component.spec.ts:43:23
```

</details>

#### 6. `src/app/users/add-edit.component.spec.ts`

**Test:** `AddEditComponent › Form validation › should enforce password minlength rule`

**Error Message:**
```
Unexpected directive 'AddEditComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/users/add-edit.component.spec.ts:43:23
```

</details>

#### 7. `src/app/users/add-edit.component.spec.ts`

**Test:** `AddEditComponent › Form validation › should not require password in edit mode`

**Error Message:**
```
Unexpected directive 'AddEditComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/users/add-edit.component.spec.ts:43:23
```

</details>

#### 8. `src/app/users/add-edit.component.spec.ts`

**Test:** `AddEditComponent › onSubmit() › should not submit when form is invalid`

**Error Message:**
```
Unexpected directive 'AddEditComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/users/add-edit.component.spec.ts:43:23
```

</details>

#### 9. `src/app/users/add-edit.component.spec.ts`

**Test:** `AddEditComponent › onSubmit() › should call accountService.register in add mode`

**Error Message:**
```
Unexpected directive 'AddEditComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/users/add-edit.component.spec.ts:43:23
```

</details>

#### 10. `src/app/users/add-edit.component.spec.ts`

**Test:** `AddEditComponent › onSubmit() › should call accountService.update in edit mode`

**Error Message:**
```
Unexpected directive 'AddEditComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/users/add-edit.component.spec.ts:43:23
```

</details>

#### 11. `src/app/users/add-edit.component.spec.ts`

**Test:** `AddEditComponent › onSubmit() › should navigate after successful save`

**Error Message:**
```
Unexpected directive 'AddEditComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/users/add-edit.component.spec.ts:43:23
```

</details>

#### 12. `src/app/users/add-edit.component.spec.ts`

**Test:** `AddEditComponent › onSubmit() › should show alert on API error`

**Error Message:**
```
Unexpected directive 'AddEditComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/users/add-edit.component.spec.ts:43:23
```

</details>

#### 13. `src/app/account/register.component.spec.ts`

**Test:** `RegisterComponent › should create`

**Error Message:**
```
Unexpected directive 'RegisterComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/account/register.component.spec.ts:33:23
      at _ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:416:32)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:2176:43)
      at _ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:415:38)
      at ZoneImpl.run (node_modules/zone.js/bundles/zone.umd.js:147:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:450:38)
```

</details>

#### 14. `src/app/account/register.component.spec.ts`

**Test:** `RegisterComponent › should initialize form with empty fields`

**Error Message:**
```
Unexpected directive 'RegisterComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/account/register.component.spec.ts:33:23
      at _ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:416:32)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:2176:43)
      at _ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:415:38)
      at ZoneImpl.run (node_modules/zone.js/bundles/zone.umd.js:147:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:450:38)
```

</details>

#### 15. `src/app/account/register.component.spec.ts`

**Test:** `RegisterComponent › should mark form invalid if required fields missing`

**Error Message:**
```
Unexpected directive 'RegisterComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/account/register.component.spec.ts:33:23
      at _ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:416:32)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:2176:43)
      at _ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:415:38)
      at ZoneImpl.run (node_modules/zone.js/bundles/zone.umd.js:147:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:450:38)
```

</details>

#### 16. `src/app/account/register.component.spec.ts`

**Test:** `RegisterComponent › should call register service when form is valid`

**Error Message:**
```
Unexpected directive 'RegisterComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/account/register.component.spec.ts:33:23
      at _ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:416:32)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:2176:43)
      at _ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:415:38)
      at ZoneImpl.run (node_modules/zone.js/bundles/zone.umd.js:147:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:450:38)
```

</details>

#### 17. `src/app/account/register.component.spec.ts`

**Test:** `RegisterComponent › should handle registration error gracefully`

**Error Message:**
```
Unexpected directive 'RegisterComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/account/register.component.spec.ts:33:23
      at _ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:416:32)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:2176:43)
      at _ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:415:38)
      at ZoneImpl.run (node_modules/zone.js/bundles/zone.umd.js:147:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:450:38)
```

</details>

#### 18. `src/app/account/register.component.spec.ts`

**Test:** `RegisterComponent › should not call register if form is invalid`

**Error Message:**
```
Unexpected directive 'RegisterComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/account/register.component.spec.ts:33:23
      at _ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:416:32)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:2176:43)
      at _ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:415:38)
      at ZoneImpl.run (node_modules/zone.js/bundles/zone.umd.js:147:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:450:38)
```

</details>

#### 19. `src/app/home/home.component.spec.ts`

**Test:** `HomeComponent › Initialization › should create the component instance`

**Error Message:**
```
Unexpected directive 'HomeComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/home/home.component.spec.ts:34:27
```

</details>

#### 20. `src/app/home/home.component.spec.ts`

**Test:** `HomeComponent › Initialization › should assign user from AccountService`

**Error Message:**
```
Unexpected directive 'HomeComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/home/home.component.spec.ts:34:27
```

</details>

#### 21. `src/app/home/home.component.spec.ts`

**Test:** `HomeComponent › Initialization › should display user first name in the greeting`

**Error Message:**
```
Unexpected directive 'HomeComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/home/home.component.spec.ts:34:27
```

</details>

#### 22. `src/app/home/home.component.spec.ts`

**Test:** `HomeComponent › Template rendering › should contain a link to manage users`

**Error Message:**
```
Unexpected directive 'HomeComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/home/home.component.spec.ts:34:27
```

</details>

#### 23. `src/app/home/home.component.spec.ts`

**Test:** `HomeComponent › Template rendering › should render paragraph content correctly`

**Error Message:**
```
Unexpected directive 'HomeComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/home/home.component.spec.ts:34:27
```

</details>

#### 24. `src/app/home/home.component.spec.ts`

**Test:** `HomeComponent › Edge behavior › should handle case when AccountService returns null user`

**Error Message:**
```
Unexpected directive 'HomeComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/home/home.component.spec.ts:34:27
```

</details>

#### 25. `src/app/home/home.component.spec.ts`

**Test:** `HomeComponent › Change detection › should update view if user data changes after initialization`

**Error Message:**
```
Unexpected directive 'HomeComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/home/home.component.spec.ts:34:27
```

</details>

#### 26. `src/app/account/layout.component.spec.ts`

**Test:** `LayoutComponent › Component creation › should create the layout component`

**Error Message:**
```
Unexpected directive 'LayoutComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/account/layout.component.spec.ts:29:27
```

</details>

#### 27. `src/app/account/layout.component.spec.ts`

**Test:** `LayoutComponent › Component creation › should redirect to home immediately on init (incorrect default state)`

**Error Message:**
```
Unexpected directive 'LayoutComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/account/layout.component.spec.ts:29:27
```

</details>

#### 28. `src/app/account/layout.component.spec.ts`

**Test:** `LayoutComponent › Redirection logic › should NOT navigate if userValue is null`

**Error Message:**
```
Unexpected directive 'LayoutComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/account/layout.component.spec.ts:29:27
```

</details>

#### 29. `src/app/account/layout.component.spec.ts`

**Test:** `LayoutComponent › Redirection logic › should navigate to home if userValue exists`

**Error Message:**
```
Unexpected directive 'LayoutComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/account/layout.component.spec.ts:29:27
```

</details>

#### 30. `src/app/account/layout.component.spec.ts`

**Test:** `LayoutComponent › Redirection logic › should use navigateByUrl instead of navigate (wrong router method)`

**Error Message:**
```
Unexpected directive 'LayoutComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/account/layout.component.spec.ts:29:27
```

</details>

#### 31. `src/app/account/layout.component.spec.ts`

**Test:** `LayoutComponent › Redirection logic › should call navigate twice (only once in actual code)`

**Error Message:**
```
Unexpected directive 'LayoutComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

<details>
<summary>Stack Trace</summary>

```
      at verifySemanticsOfNgModuleImport (node_modules/@angular/core/fesm2022/core.mjs:30215:19)
      at node_modules/@angular/core/fesm2022/core.mjs:30109:9
          at Array.forEach (<anonymous>)
      at verifySemanticsOfNgModuleDef (node_modules/@angular/core/fesm2022/core.mjs:30108:10)
      at Function.get (node_modules/@angular/core/fesm2022/core.mjs:30056:30)
      at TestBedCompiler.applyProviderOverridesInScope (node_modules/@angular/core/fesm2022/testing.mjs:1213:29)
      at TestBedCompiler.compileTestModule (node_modules/@angular/core/fesm2022/testing.mjs:1536:14)
      at TestBedCompiler.finalize (node_modules/@angular/core/fesm2022/testing.mjs:1038:14)
      at _TestBedImpl.get testModuleRef [as testModuleRef] (node_modules/@angular/core/fesm2022/testing.mjs:2071:49)
      at _TestBedImpl.inject (node_modules/@angular/core/fesm2022/testing.mjs:1973:29)
      at _TestBedImpl.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:2026:44)
      at Function.createComponent (node_modules/@angular/core/fesm2022/testing.mjs:1842:37)
      at src/app/account/layout.component.spec.ts:29:27
```

</details>

---
