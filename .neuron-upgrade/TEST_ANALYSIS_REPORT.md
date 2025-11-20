# Test Analysis Report

**Angular Upgrade:** 14.0.0 → 18.0.0

*This report contains detailed information about test analysis, including applied fixes and remaining failures.*

## Summary

- **Total Fixes Applied:** 70
- **Test Analysis Iterations:** 13
- **Max Retries:** 5
- **Remaining Failures:** 8

## Test Analysis Iterations

### Iteration 1 (Initial Verification)

- **Found:** 8 test failure(s)


### Iteration 2 (Retry 0)

- **Found:** 43 test failure(s)


### Iteration 3 (Retry 1)

- **Found:** 14 test failure(s)
- **Applied:** 52 fix(es) across 11 batch(es)

<details>
<summary>Fixes applied (52):</summary>

#### `src/app/account/register.component.spec.ts` (5 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Replace jasmine.SpyObj type annotations with 'any' to work with Jest instead of Jasmine

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
    };
    alertServiceSpy = {
      clear: jest.fn(),
      success: jest.fn(),
      error: jest.fn()
    };
    routerSpy = {
      navigate: jest.fn()
    };
```

**Fix 3: Replace** (Confidence: 95%)

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

**Fix 4: Replace** (Confidence: 98%)

Replace Jasmine spy syntax 'and.returnValue' with Jest syntax 'mockReturnValue'

**Original Code:**
```typescript
accountServiceSpy.register.and.returnValue(of({}));
```

**Fixed Code:**
```typescript
accountServiceSpy.register.mockReturnValue(of({}));
```

**Fix 5: Replace** (Confidence: 98%)

Replace Jasmine spy syntax 'and.returnValue' with Jest syntax 'mockReturnValue' for error case

**Original Code:**
```typescript
accountServiceSpy.register.and.returnValue(throwError(() => 'Server error'));
```

**Fixed Code:**
```typescript
accountServiceSpy.register.mockReturnValue(throwError(() => 'Server error'));
```

---

#### `src/app/services/account.service.spec.ts` (6 fix(es))

**Fix 1: Replace** (Confidence: 98%)

Fix property name from 'user' to 'username' to match actual API request body structure

**Original Code:**
```typescript
expect(req.request.body.user).toBe('ShashankBharadwaj');
```

**Fixed Code:**
```typescript
expect(req.request.body.username).toBe('ShashankBharadwaj');
```

**Fix 2: Replace** (Confidence: 98%)

Fix assertion to expect null instead of empty object, matching AccountService logout() behavior

**Original Code:**
```typescript
expect(service.userValue).toEqual({});
```

**Fixed Code:**
```typescript
expect(service.userValue).toBeNull();
```

**Fix 3: Replace** (Confidence: 98%)

Fix HTTP method expectation from PUT to POST for register endpoint

**Original Code:**
```typescript
expect(req.request.method).toBe('PUT');
```

**Fixed Code:**
```typescript
expect(req.request.method).toBe('POST');
```

**Fix 4: Replace** (Confidence: 95%)

Changed user ID from '1' to '101' to match mockUser.id that is stored in localStorage during beforeEach

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

**Fix 5: Replace** (Confidence: 95%)

Added .not to expect statement since logout should NOT be called when deleting a different user

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

**Fix 6: Replace** (Confidence: 95%)

Changed user ID to '101' to match mockUser, fixed HTTP method from POST to PUT to match service implementation, and fixed expected firstName from 'John' to 'Max' to match updatePayload

**Original Code:**
```typescript
it('should update user when same ID is logged in', () => {
            const updatePayload = { firstName: 'Max' };

            service.update('1', updatePayload).subscribe();

            const req = httpMock.expectOne(`${environment.apiUrl}/users/1`);
            expect(req.request.method).toBe('POST');
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

---

#### `src/app/home/home.component.spec.ts` (4 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Changed expected firstName from 'John' to 'Shashank' to match mockUser.firstName

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

Changed expected greeting from 'Hi John' to 'Hi Shashank!' to match mockUser.firstName and template format

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

**Fix 3: Replace** (Confidence: 95%)

Changed expected paragraph count from 3 to 2 to match template (which has 2 <p> tags), and removed extra exclamation mark to match template text

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

Fixed test expectation to match actual rendered output when user is null. The template renders 'Hi !' when user?.firstName is undefined.

**Original Code:**
```typescript
it('should handle case when AccountService returns null user', () => {
            accountServiceMock.userValue = null;
            fixture = TestBed.createComponent(HomeComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const heading = fixture.debugElement.query(By.css('h1')).nativeElement;

            expect(heading.textContent).toContain('undefined');
        });
```

**Fixed Code:**
```typescript
it('should handle case when AccountService returns null user', () => {
            accountServiceMock.userValue = null;
            fixture = TestBed.createComponent(HomeComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const heading = fixture.debugElement.query(By.css('h1')).nativeElement;

            expect(heading.textContent.trim()).toBe('Hi !');
        });
```

---

#### `src/app/account/layout.component.spec.ts` (5 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Fixed test expectation - component should NOT redirect when userValue is null (default state)

**Original Code:**
```typescript
it('should redirect to home immediately on init (incorrect default state)', () => {
            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });
```

**Fixed Code:**
```typescript
it('should redirect to home immediately on init (incorrect default state)', () => {
            expect(router.navigate).not.toHaveBeenCalledWith(['/']);
        });
```

**Fix 2: Replace** (Confidence: 95%)

Fixed test expectation - component uses navigate() method, not navigateByUrl()

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

**Fix 3: Replace** (Confidence: 95%)

Fixed test expectation - component only calls navigate() once, not twice

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

**Fix 4: Import** (Confidence: 95%)

Add RouterOutlet import required for Angular 15 standalone directive declaration in TestBed

**Fixed Code:**
```typescript
import { RouterOutlet } from '@angular/router';
```

**Fix 5: Replace** (Confidence: 95%)

Add RouterOutlet to imports array in TestBed configuration - Angular 15 requires explicit import of standalone directives like router-outlet

**Original Code:**
```typescript
await TestBed.configureTestingModule({
            declarations: [LayoutComponent],
            providers: [
                { provide: Router, useClass: MockRouter },
                { provide: AccountService, useClass: MockAccountService },
            ],
        }).compileComponents();
```

**Fixed Code:**
```typescript
await TestBed.configureTestingModule({
            declarations: [LayoutComponent],
            imports: [RouterOutlet],
            providers: [
                { provide: Router, useClass: MockRouter },
                { provide: AccountService, useClass: MockAccountService },
            ],
        }).compileComponents();
```

---

#### `src/app/users/add-edit.component.spec.ts` (5 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Fixed test expectation - form should be invalid when required fields are empty

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

**Fix 2: Replace** (Confidence: 95%)

Fixed test expectation - password with only 3 characters should be invalid (minLength is 6)

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

Fixed password validation check in edit mode - hasValidator is not a valid property, should check hasError('required') instead

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

Fixed assertion - when form is invalid, register should NOT be called, so expectation should be .not.toHaveBeenCalled()

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

Fixed assertion - in add mode with valid form, register SHOULD be called, so removed .not from expectation

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

#### `src/app/account/login.component.spec.ts` (2 fix(es))

**Fix 1: Replace** (Confidence: 100%)

Fixed router method call - should use navigateByUrl instead of navigate to match the actual implementation

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

**Fix 2: Replace** (Confidence: 100%)

Fixed assertion - alertService.clear is only called once in the actual implementation, so expectation should be 1 not 2

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

#### `src/app/components/alert.component.spec.ts` (10 fix(es))

**Fix 1: Replace** (Confidence: 98%)

Fixed assertion - alerts array length should be 0, not null, after removing alert

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

**Fix 2: Replace** (Confidence: 98%)

Fixed assertion - alerts array should be empty array [], not the alert object, after fade out completes

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

**Fix 3: Replace** (Confidence: 98%)

Fixed assertion - cssClass returns undefined for undefined input, not empty string

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

**Fix 4: Replace** (Confidence: 90%)

Added fixture.detectChanges() calls before and after removeAlert to ensure change detection runs and component cleanup happens properly.

**Original Code:**
```typescript
describe('removeAlert', () => {
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
describe('removeAlert', () => {
        it('should remove the alert immediately if fade is false', () => {
            const alert: Alert = { message: 'Remove me', type: AlertType.Warning };
            component.alerts = [alert];
            component.fade = false;

            fixture.detectChanges();
            component.removeAlert(alert);
            fixture.detectChanges();

            expect(component.alerts.length).toBe(0);
        });
```

**Fix 5: Replace** (Confidence: 90%)

Added fixture.detectChanges() calls to ensure proper change detection in fakeAsync test and prevent cleanup errors.

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

**Fixed Code:**
```typescript
it('should fade out and remove alert after timeout if fade is true', fakeAsync(() => {
            const alert: Alert = { message: 'Fade out', type: AlertType.Info };
            component.alerts = [alert];
            component.fade = true;

            fixture.detectChanges();
            component.removeAlert(alert);
            expect(alert.fade).toBe(true);
            tick(250);
            fixture.detectChanges();

            expect(component.alerts).toEqual([]);
        }));
```

**Fix 6: Replace** (Confidence: 90%)

Added fixture.detectChanges() to ensure component is properly initialized and prevent cleanup errors.

**Original Code:**
```typescript
describe('cssClass', () => {
        it('should return correct classes for success alert', () => {
            const alert: Alert = { message: 'Done', type: AlertType.Success };
            const css = component.cssClass(alert);

            expect(css).toContain('alert-success');
            expect(css).toContain('alert');
        });
```

**Fixed Code:**
```typescript
describe('cssClass', () => {
        it('should return correct classes for success alert', () => {
            const alert: Alert = { message: 'Done', type: AlertType.Success };
            fixture.detectChanges();
            const css = component.cssClass(alert);

            expect(css).toContain('alert-success');
            expect(css).toContain('alert');
        });
```

**Fix 7: Replace** (Confidence: 90%)

Added fixture.detectChanges() to ensure component is properly initialized before calling cssClass.

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
            fixture.detectChanges();
            const css = component.cssClass(undefined as any);
            expect(css).toBeUndefined();
        });
```

**Fix 8: Replace** (Confidence: 90%)

Added fixture.detectChanges() calls to ensure proper change detection during alert subscription test.

**Fixed Code:** *(too long to display, see file changes)*

**Fix 9: Replace** (Confidence: 90%)

Added fixture.detectChanges() calls to ensure proper change detection during navigation test.

**Original Code:**
```typescript
it('should clear alerts on navigation', () => {
            alertServiceMock.onAlert.mockReturnValue(of());
            component.ngOnInit();

            routerEvents$.next(new NavigationStart(1, '/home'));
            expect(alertServiceMock.clear).toHaveBeenCalledWith('default-alert');
        });
```

**Fixed Code:**
```typescript
it('should clear alerts on navigation', () => {
            alertServiceMock.onAlert.mockReturnValue(of());
            component.ngOnInit();
            fixture.detectChanges();

            routerEvents$.next(new NavigationStart(1, '/home'));
            fixture.detectChanges();
            expect(alertServiceMock.clear).toHaveBeenCalledWith('default-alert');
        });
```

**Fix 10: Replace** (Confidence: 90%)

Added fixture.detectChanges() calls to ensure proper component lifecycle and cleanup in ngOnDestroy test.

**Fixed Code:** *(too long to display, see file changes)*

---

#### `src/app/services/alert.service.spec.ts` (15 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Fixed test logic - spy should NOT be called when alert id doesn't match, added timeout to verify no emission

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

Fixed test assertion - expected message should match actual case 'Operation Failed' not 'operation failed'

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

Fixed test logic - spy should NOT be called when clear id doesn't match subscription id, added timeout to verify no emission

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

Fixed test logic error: Both subscribers should receive the alert since they both subscribe to the same alert ID 'multi'. The service broadcasts to all matching subscribers. Added setTimeout to allow async observable emissions to complete, and changed expectation for secondSpy to toHaveBeenCalled().

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

Fixed test logic error: The clear() method should NOT throw an error when called before any alert is emitted. It simply emits a new alert with empty message. Changed toThrowError() to not.toThrowError().

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

**Fix 6: Replace** (Confidence: 85%)

Wrapped expectations in try-catch to properly handle async errors and prevent unhandled promise rejections that cause console errors.

**Original Code:**
```typescript
describe('onAlert()', () => {
    it('should emit alert with matching id', (done) => {
      const alert: Alert = new Alert({
        id: 'custom-id',
        message: 'Test Alert',
        type: AlertType.Success,
      });

      service.onAlert('custom-id').subscribe((result) => {
        expect(result.message).toBe('Test Alert');
        expect(result.type).toBe(AlertType.Success);
        done();
      });

      service['subject'].next(alert);
    });
```

**Fixed Code:** *(too long to display, see file changes)*

**Fix 7: Replace** (Confidence: 85%)

Wrapped expectations in try-catch to properly handle async errors in setTimeout callback.

**Original Code:**
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

**Fixed Code:**
```typescript
it('should not emit if alert id does not match', (done) => {
      const alert: Alert = new Alert({ id: 'other-id', message: 'Should not emit' });

      const spy = jest.fn();
      service.onAlert('expected-id').subscribe(spy);

      service['subject'].next(alert);

      setTimeout(() => {
        try {
          expect(spy).not.toHaveBeenCalled();
          done();
        } catch (error) {
          done(error);
        }
      }, 100);
    });
```

**Fix 8: Replace** (Confidence: 85%)

Wrapped expectations in try-catch to properly handle async errors in subscription callback.

**Original Code:**
```typescript
describe('alert()', () => {
    it('should use default id when none provided', (done) => {
      service.onAlert().subscribe((a) => {
        expect(a.id).toBe('default-alert');
        expect(a.message).toBe('No ID Alert');
        done();
      });

      service.alert(new Alert({ message: 'No ID Alert' }));
    });
```

**Fixed Code:**
```typescript
describe('alert()', () => {
    it('should use default id when none provided', (done) => {
      service.onAlert().subscribe((a) => {
        try {
          expect(a.id).toBe('default-alert');
          expect(a.message).toBe('No ID Alert');
          done();
        } catch (error) {
          done(error);
        }
      });

      service.alert(new Alert({ message: 'No ID Alert' }));
    });
```

**Fix 9: Replace** (Confidence: 85%)

Wrapped expectations in try-catch to properly handle async errors in subscription callback.

**Original Code:**
```typescript
it('should push alert into subject stream', (done) => {
      const alert = new Alert({ id: 'stream-test', message: 'Streamed Alert' });

      service.onAlert('stream-test').subscribe((a) => {
        expect(a.id).toBe('stream-test');
        done();
      });

      service.alert(alert);
    });
```

**Fixed Code:**
```typescript
it('should push alert into subject stream', (done) => {
      const alert = new Alert({ id: 'stream-test', message: 'Streamed Alert' });

      service.onAlert('stream-test').subscribe((a) => {
        try {
          expect(a.id).toBe('stream-test');
          done();
        } catch (error) {
          done(error);
        }
      });

      service.alert(alert);
    });
```

**Fix 10: Replace** (Confidence: 85%)

Wrapped expectations in try-catch to properly handle async errors in subscription callback.

**Original Code:**
```typescript
describe('convenience methods', () => {
    it('should emit success alert with type Success', (done) => {
      service.onAlert().subscribe((a) => {
        expect(a.type).toBe(AlertType.Success);
        expect(a.message).toBe('Operation completed');
        done();
      });

      service.success('Operation completed');
    });
```

**Fixed Code:**
```typescript
describe('convenience methods', () => {
    it('should emit success alert with type Success', (done) => {
      service.onAlert().subscribe((a) => {
        try {
          expect(a.type).toBe(AlertType.Success);
          expect(a.message).toBe('Operation completed');
          done();
        } catch (error) {
          done(error);
        }
      });

      service.success('Operation completed');
    });
```

**Fix 11: Replace** (Confidence: 85%)

Wrapped expectations in try-catch to properly handle async errors in subscription callback.

**Original Code:**
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

**Fixed Code:**
```typescript
it('should emit error alert with message and type', (done) => {
      service.onAlert().subscribe((a) => {
        try {
          expect(a.type).toBe(AlertType.Error);
          expect(a.message).toBe('Operation Failed');
          done();
        } catch (error) {
          done(error);
        }
      });

      service.error('Operation Failed');
    });
```

**Fix 12: Replace** (Confidence: 85%)

Wrapped expectations in try-catch to properly handle async errors in subscription callback.

**Original Code:**
```typescript
describe('clear()', () => {
    it('should emit empty alert with given id', (done) => {
      service.onAlert('custom').subscribe((a) => {
        expect(a.message).toBeUndefined();
        expect(a.id).toBe('custom');
        done();
      });

      service.clear('custom');
    });
```

**Fixed Code:**
```typescript
describe('clear()', () => {
    it('should emit empty alert with given id', (done) => {
      service.onAlert('custom').subscribe((a) => {
        try {
          expect(a.message).toBeUndefined();
          expect(a.id).toBe('custom');
          done();
        } catch (error) {
          done(error);
        }
      });

      service.clear('custom');
    });
```

**Fix 13: Replace** (Confidence: 85%)

Wrapped expectations in try-catch to properly handle async errors in setTimeout callback.

**Original Code:**
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

**Fixed Code:**
```typescript
it('should not emit when id does not match', (done) => {
      const spy = jest.fn();
      service.onAlert('expected').subscribe(spy);

      service.clear('wrong-id');

      setTimeout(() => {
        try {
          expect(spy).not.toHaveBeenCalled();
          done();
        } catch (error) {
          done(error);
        }
      }, 100);
    });
```

**Fix 14: Replace** (Confidence: 85%)

Wrapped expectations in try-catch to properly handle async errors in setTimeout callback.

**Fixed Code:** *(too long to display, see file changes)*

**Fix 15: Replace** (Confidence: 98%)

Changed .not.toThrowError() to .not.toThrow() - Jest uses toThrow() matcher instead of toThrowError()

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

</details>


### Iteration 4 (Retry 2)

- **Found:** 10 test failure(s)
- **Applied:** 5 fix(es) across 3 batch(es)

<details>
<summary>Fixes applied (5):</summary>

#### `src/app/services/account.service.spec.ts` (3 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Move localStorage.setItem before TestBed.configureTestingModule so the AccountService constructor reads the user from localStorage during initialization

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

**Fix 2: Replace** (Confidence: 95%)

Fix assertion - when updating a different user, the current user should remain unchanged (id 101), not become null

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

**Fix 3: Replace** (Confidence: 95%)

Add mockImplementation to prevent the actual logout method from executing (which navigates and clears state), allowing the spy to properly track the call

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

---

#### `src/app/components/alert.component.spec.ts` (2 fix(es))

**Fix 1: Replace** (Confidence: 90%)

Remove extra fixture.detectChanges() call between ngOnInit and alertSubject.next - the subscription is synchronous and detectChanges should only be called after the alert is emitted

**Fixed Code:** *(too long to display, see file changes)*

**Fix 2: Replace** (Confidence: 95%)

Added ngOnInit() call with mocked alertService to initialize subscriptions before testing removeAlert

**Original Code:**
```typescript
describe('removeAlert', () => {
        it('should remove the alert immediately if fade is false', () => {
            const alert: Alert = { message: 'Remove me', type: AlertType.Warning };
            component.alerts = [alert];
            component.fade = false;

            fixture.detectChanges();
            component.removeAlert(alert);
            fixture.detectChanges();

            expect(component.alerts.length).toBe(0);
        });
```

**Fixed Code:** *(too long to display, see file changes)*

---

</details>


### Iteration 5 (Retry 3)

- **Found:** 1 test failure(s)
- **Applied:** 5 fix(es) across 2 batch(es)

<details>
<summary>Fixes applied (5):</summary>

#### `src/app/components/alert.component.spec.ts` (3 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Added ngOnInit() call with mocked alertService to initialize subscriptions before testing fade behavior

**Original Code:**
```typescript
it('should fade out and remove alert after timeout if fade is true', fakeAsync(() => {
            const alert: Alert = { message: 'Fade out', type: AlertType.Info };
            component.alerts = [alert];
            component.fade = true;

            fixture.detectChanges();
            component.removeAlert(alert);
            expect(alert.fade).toBe(true);
            tick(250);
            fixture.detectChanges();

            expect(component.alerts).toEqual([]);
        }));
```

**Fixed Code:** *(too long to display, see file changes)*

**Fix 2: Replace** (Confidence: 95%)

Added ngOnInit() call with mocked alertService to initialize subscriptions before testing cssClass

**Original Code:**
```typescript
describe('cssClass', () => {
        it('should return correct classes for success alert', () => {
            const alert: Alert = { message: 'Done', type: AlertType.Success };
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
            component.ngOnInit();
            const alert: Alert = { message: 'Done', type: AlertType.Success };
            fixture.detectChanges();
            const css = component.cssClass(alert);

            expect(css).toContain('alert-success');
            expect(css).toContain('alert');
        });
```

**Fix 3: Replace** (Confidence: 95%)

Added ngOnInit() call with mocked alertService to initialize subscriptions before testing undefined alert case

**Original Code:**
```typescript
it('should not break when alert is undefined', () => {
            fixture.detectChanges();
            const css = component.cssClass(undefined as any);
            expect(css).toBeUndefined();
        });
```

**Fixed Code:**
```typescript
it('should not break when alert is undefined', () => {
            alertServiceMock.onAlert.mockReturnValue(of());
            component.ngOnInit();
            fixture.detectChanges();
            const css = component.cssClass(undefined as any);
            expect(css).toBeUndefined();
        });
```

---

#### `src/app/account/register.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 100%)

Replaced Jest-incompatible toBeTrue() matcher with toBe(true) for Jest compatibility

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

#### `src/app/users/add-edit.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Move AddEditComponent from declarations to imports array for Angular 18 compatibility

**Original Code:**
```typescript
await TestBed.configureTestingModule({
      declarations: [AddEditComponent],
      imports: [ReactiveFormsModule],
```

**Fixed Code:**
```typescript
await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AddEditComponent],
```

---

</details>


### Iteration 6 (Retry 4)

- ✅ All tests passing

<details>
<summary>Fixes applied (1):</summary>

#### `src/app/home/home.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Move HomeComponent from declarations to imports array for Angular 18 compatibility

**Original Code:**
```typescript
await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [HomeComponent],
```

**Fixed Code:**
```typescript
await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HomeComponent],
```

---

</details>


### Iteration 7 (Retry 4)

- ✅ All tests passing

<details>
<summary>Fixes applied (1):</summary>

#### `src/app/components/alert.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Move AlertComponent from declarations to imports array for Angular 18 compatibility

**Original Code:**
```typescript
await TestBed.configureTestingModule({
            declarations: [AlertComponent],
```

**Fixed Code:**
```typescript
await TestBed.configureTestingModule({
            imports: [AlertComponent],
```

---

</details>


### Iteration 8 (Retry 4)

- ✅ All tests passing

<details>
<summary>Fixes applied (1):</summary>

#### `src/app/account/layout.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Consolidated RouterOutlet import with Router from @angular/router to fix duplicate imports

**Original Code:**
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AccountService } from '../services';
import { RouterOutlet } from '@angular/router';
```

**Fixed Code:**
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AccountService } from '../services';
```

---

</details>


### Iteration 9 (Retry 4)

- **Found:** 8 test failure(s)
- **Applied:** 1 fix(es) across 1 batch(es)

<details>
<summary>Fixes applied (1):</summary>

#### `src/app/account/login.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 90%)

Moved LoginComponent from declarations to imports array for Angular 18 standalone component support

**Fixed Code:** *(too long to display, see file changes)*

---

</details>


### Iteration 10 (Retry 4)

- **Found:** 8 test failure(s)
- **Applied:** 1 fix(es) across 1 batch(es)

<details>
<summary>Fixes applied (1):</summary>

#### `src/app/account/register.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 90%)

Moved RegisterComponent from declarations to imports array for Angular 18 standalone component support

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

</details>


### Iteration 11 (Retry 4)

- **Found:** 8 test failure(s)
- **Applied:** 1 fix(es) across 1 batch(es)

<details>
<summary>Fixes applied (1):</summary>

#### `src/app/account/layout.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 90%)

Moved LayoutComponent from declarations to imports array for Angular 18 standalone component support

**Original Code:**
```typescript
await TestBed.configureTestingModule({
            declarations: [LayoutComponent],
            imports: [RouterOutlet],
            providers: [
                { provide: Router, useClass: MockRouter },
                { provide: AccountService, useClass: MockAccountService },
            ],
        }).compileComponents();
```

**Fixed Code:**
```typescript
await TestBed.configureTestingModule({
            imports: [LayoutComponent, RouterOutlet],
            providers: [
                { provide: Router, useClass: MockRouter },
                { provide: AccountService, useClass: MockAccountService },
            ],
        }).compileComponents();
```

---

</details>


### Iteration 12 (Retry 4)

- **Found:** 8 test failure(s)
- **Applied:** 1 fix(es) across 1 batch(es)

*1 fix(es) were applied but details are not available.*


### Iteration 13 (Retry 5)

- **Found:** 8 test failure(s)
- **Applied:** 7 fix(es) across 2 batch(es)

*7 fix(es) were applied but details are not available.*


## Remaining Test Failures

The following 8 test failure(s) require manual attention (max retries of 5 reached):

### Compilation Error (8)

#### 1. `src/app/services/alert.service.spec.ts`

**Test:** `Test suite failed to run`

**Error Message:**
```
Test suite failed to run
```

<details>
<summary>Stack Trace</summary>

```
      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/resolver.js:427:11)
      at Object.<anonymous> (setup-jest.ts:3:1)
```

</details>

#### 2. `src/app/home/home.component.spec.ts`

**Test:** `Test suite failed to run`

**Error Message:**
```
Test suite failed to run
```

<details>
<summary>Stack Trace</summary>

```
      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/resolver.js:427:11)
      at Object.<anonymous> (setup-jest.ts:3:1)
```

</details>

#### 3. `src/app/components/alert.component.spec.ts`

**Test:** `Test suite failed to run`

**Error Message:**
```
Test suite failed to run
```

<details>
<summary>Stack Trace</summary>

```
      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/resolver.js:427:11)
      at Object.<anonymous> (setup-jest.ts:3:1)
```

</details>

#### 4. `src/app/users/add-edit.component.spec.ts`

**Test:** `Test suite failed to run`

**Error Message:**
```
Test suite failed to run
```

<details>
<summary>Stack Trace</summary>

```
      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/resolver.js:427:11)
      at Object.<anonymous> (setup-jest.ts:3:1)
```

</details>

#### 5. `src/app/account/layout.component.spec.ts`

**Test:** `Test suite failed to run`

**Error Message:**
```
Test suite failed to run
```

<details>
<summary>Stack Trace</summary>

```
      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/resolver.js:427:11)
      at Object.<anonymous> (setup-jest.ts:3:1)
```

</details>

#### 6. `src/app/account/register.component.spec.ts`

**Test:** `Test suite failed to run`

**Error Message:**
```
Test suite failed to run
```

<details>
<summary>Stack Trace</summary>

```
      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/resolver.js:427:11)
      at Object.<anonymous> (setup-jest.ts:3:1)
```

</details>

#### 7. `src/app/services/account.service.spec.ts`

**Test:** `Test suite failed to run`

**Error Message:**
```
Test suite failed to run
```

<details>
<summary>Stack Trace</summary>

```
      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/resolver.js:427:11)
      at Object.<anonymous> (setup-jest.ts:3:1)
```

</details>

#### 8. `src/app/account/login.component.spec.ts`

**Test:** `Test suite failed to run`

**Error Message:**
```
Test suite failed to run
```

<details>
<summary>Stack Trace</summary>

```
      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/resolver.js:427:11)
      at Object.<anonymous> (setup-jest.ts:3:1)
```

</details>

---
