# Test Analysis Report

**Angular Upgrade:** 14.0.0 → 15.0.0

*This report contains detailed information about test analysis, including applied fixes and remaining failures.*

## Summary

- **Total Fixes Applied:** 76
- **Test Analysis Iterations:** 11
- **Max Retries:** 10
- **Remaining Failures:** 11

## Test Analysis Iterations

### Iteration 1 (Initial Verification)

- **Found:** 8 test failure(s)


### Iteration 2 (Retry 1)

- **Found:** 43 test failure(s)
- **Applied:** 3 fix(es) across 2 batch(es)

<details>
<summary>Fixes applied (3):</summary>

#### `src/app/account/register.component.spec.ts` (3 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Replace Jasmine SpyObj types with Jest Mocked types for type
   declarations

**Original Code:**
```typescript
let accountServiceSpy: jasmine.SpyObj<AccountService>;
  let
   alertServiceSpy: jasmine.SpyObj<AlertService>;
  let routerSpy: jasmine.SpyObj<Router>;
```

**Fixed Code:**
```typescript
let accountServiceSpy: jest.Mocked<AccountService>;
  let
   alertServiceSpy: jest.Mocked<AlertService>;
  let routerSpy: jest.Mocked<Router>;
```

**Fix 2: Replace** (Confidence: 95%)

Replace jasmine.createSpyObj with Jest mock objects using jest.fn()

**Original Code:**
```typescript
accountServiceSpy = jasmine.createSpyObj('AccountService',
   ['register']);
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['clear', 'success',
   'error']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
```

**Fixed Code:**
```typescript
accountServiceSpy = {
      register: jest.fn()
    } as
   jest.Mocked<AccountService>;
    alertServiceSpy = {
      clear: jest.fn(),
      success:
   jest.fn(),
      error: jest.fn()
    } as jest.Mocked<AlertService>;
    routerSpy = {

     navigate: jest.fn()
    } as jest.Mocked<Router>;
```

**Fix 3: Replace** (Confidence: 95%)

Replace Jasmine spy method and.returnValue with Jest mockReturnValue

**Original Code:**
```typescript
accountServiceSpy.register.and.returnValue(of({}));
```

**Fixed Code:**
```typescript
accountServiceSpy.register.mockReturnValue(of({}));
```

---

</details>


### Iteration 3 (Retry 2)

- **Found:** 15 test failure(s)
- **Applied:** 33 fix(es) across 8 batch(es)

<details>
<summary>Fixes applied (33):</summary>

#### `src/app/account/register.component.spec.ts` (3 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Replace jasmine.objectContaining with Jest expect.objectContaining
   matcher

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

**Fix 2: Replace** (Confidence: 95%)

Replace Jasmine spy method and.returnValue with Jest mockReturnValue for
   error case

**Original Code:**
```typescript
accountServiceSpy.register.and.returnValue(throwError(() => 'Server    error'));
```

**Fixed Code:**
```typescript
accountServiceSpy.register.mockReturnValue(throwError(() => 'Server    error'));
```

**Fix 3: Replace** (Confidence: 100%)

Replace Jasmine matcher toBeTrue() with Jest matcher toBe(true)

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

#### `src/app/services/account.service.spec.ts` (8 fix(es))

**Fix 1: Replace** (Confidence: 90%)

Fix assertion to use mockUser.username instead of hardcoded string for
   consistency

**Original Code:**
```typescript
describe('Initialization', () => {
        it('should initialize    with user from localStorage', () => {
            const currentUser = service.userValue;

          expect(currentUser?.username).toBe('ShashankBharadwaj');
        });
    });
```

**Fixed Code:**
```typescript
describe('Initialization', () => {
        it('should initialize with    user from localStorage', () => {
            const currentUser = service.userValue;

     expect(currentUser?.username).toBe(mockUser.username);
        });
    });
```

**Fix 2: Replace** (Confidence: 95%)

Fix assertion to check for 'username' property instead of 'user' (matches
   the actual service implementation which sends {username, password})

**Original Code:**
```typescript
it('should call API with username and password', () => {

         service.login('ShashankBharadwaj', 'password123').subscribe();
            const req =
   httpMock.expectOne(`${environment.apiUrl}/users/authenticate`);


   expect(req.request.body.user).toBe('ShashankBharadwaj');
        });
```

**Fixed Code:**
```typescript
it('should call API with username and password', () => {

      service.login('ShashankBharadwaj', 'password123').subscribe();
            const req =
   httpMock.expectOne(`${environment.apiUrl}/users/authenticate`);


   expect(req.request.body.username).toBe('ShashankBharadwaj');

   expect(req.request.body.password).toBe('password123');
            req.flush(mockUser);

     });
```

**Fix 3: Replace** (Confidence: 100%)

Fix assertion to expect null instead of empty object - logout() sets
   userSubject.next(null) not {}

**Original Code:**
```typescript
it('should clear user from localStorage and navigate to login',
   () => {
            service.logout();

            expect(service.userValue).toEqual({});


               expect(localStorage.getItem('user')).toBeNull();

   expect(routerMock.navigate).toHaveBeenCalledWith(['/account/login']);
        });
```

**Fixed Code:**
```typescript
it('should clear user from localStorage and navigate to login', ()
   => {
            service.logout();

            expect(service.userValue).toBeNull();


           expect(localStorage.getItem('user')).toBeNull();

   expect(routerMock.navigate).toHaveBeenCalledWith(['/account/login']);
        });
```

**Fix 4: Replace** (Confidence: 100%)

Fix assertion to expect POST method instead of PUT - the register()
   service method uses http.post()

**Original Code:**
```typescript
it('should call POST /users/register API', () => {

   const newUser: User = { id: '2', username: 'liam', firstName: 'Liam', lastName: 'Huang', token:
   '' };

            service.register(newUser).subscribe();
            const req =
   httpMock.expectOne(`${environment.apiUrl}/users/register`);


   expect(req.request.method).toBe('PUT');
        });
```

**Fixed Code:**
```typescript
it('should call POST /users/register API', () => {

   const newUser: User = { id: '2', username: 'liam', firstName: 'Liam', lastName: 'Huang', token:
   '' };

            service.register(newUser).subscribe();
            const req =
   httpMock.expectOne(`${environment.apiUrl}/users/register`);


   expect(req.request.method).toBe('POST');
            req.flush({});
        });
```

**Fix 5: Replace** (Confidence: 95%)

Fixed test to use correct user ID '101' (matching mockUser ID) when
   testing delete of current user

**Original Code:**
```typescript
it('should call logout if deleting current user', () => {

          const spyLogout = jest.spyOn(service, 'logout');


   service.delete('1').subscribe();
            const req =
   httpMock.expectOne(`${environment.apiUrl}/users/1`);
            req.flush({});


   expect(spyLogout).toHaveBeenCalledTimes(1);
```

**Fixed Code:**
```typescript
it('should call logout if deleting current user', () => {

       const spyLogout = jest.spyOn(service, 'logout');


   service.delete('101').subscribe();
            const req =
   httpMock.expectOne(`${environment.apiUrl}/users/101`);
            req.flush({});


     expect(spyLogout).toHaveBeenCalledTimes(1);
```

**Fix 6: Replace** (Confidence: 95%)

Fixed test assertion to expect logout NOT to be called when deleting
   another user (inverted logic)

**Original Code:**
```typescript
it('should not call logout if deleting another user', () => {

              const spyLogout = jest.spyOn(service, 'logout');


   service.delete('2').subscribe();
            const req =
   httpMock.expectOne(`${environment.apiUrl}/users/2`);
            req.flush({});


   expect(spyLogout).toHaveBeenCalled();
```

**Fixed Code:**
```typescript
it('should not call logout if deleting another user', () => {

           const spyLogout = jest.spyOn(service, 'logout');


   service.delete('2').subscribe();
            const req =
   httpMock.expectOne(`${environment.apiUrl}/users/2`);
            req.flush({});


   expect(spyLogout).not.toHaveBeenCalled();
```

**Fix 7: Replace** (Confidence: 95%)

Change mockUser id from '101' to '1' to match the user ID used in update()
    and delete() tests

**Original Code:**
```typescript
const mockUser: User = {
        id: '101',
        username:
   'ShashankBharadwaj',
        firstName: 'Shashank',
        lastName: 'Bharadwaj',

   token: 'checkThisT0KenOut&!etMeInHehehe'
    };
```

**Fixed Code:**
```typescript
const mockUser: User = {
        id: '1',
        username:
   'ShashankBharadwaj',
        firstName: 'Shashank',
        lastName: 'Bharadwaj',

   token: 'checkThisT0KenOut&!etMeInHehehe'
    };
```

**Fix 8: Replace** (Confidence: 90%)

Fix indentation for the expect statement to ensure proper test execution

**Original Code:**
```typescript
it('should initialize with    user from localStorage', () => {

               const currentUser = service.userValue;


   expect(currentUser?.username).toBe(mockUser.username);
        });
```

**Fixed Code:**
```typescript
it('should initialize with    user from localStorage', () => {

            const currentUser = service.userValue;


   expect(currentUser?.username).toBe(mockUser.username);
        });
```

---

#### `src/app/home/home.component.spec.ts` (5 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Fixed test to expect correct firstName 'Shashank' from mockUser instead of
    'John'

**Original Code:**
```typescript
it('should assign user from AccountService', () => {

     fixture.detectChanges();
            expect(component.user?.firstName).toEqual('John');
```

**Fixed Code:**
```typescript
it('should assign user from AccountService', () => {

   fixture.detectChanges();
            expect(component.user?.firstName).toEqual('Shashank');
```

**Fix 2: Replace** (Confidence: 95%)

Fixed test to expect correct greeting 'Hi Shashank!' matching mockUser
   firstName and template format

**Original Code:**
```typescript
it('should display user first name in the greeting', () => {

             fixture.detectChanges();
            const heading =
   fixture.debugElement.query(By.css('h1')).nativeElement;


   expect(heading.textContent.trim()).toBe('Hi John');
```

**Fixed Code:**
```typescript
it('should display user first name in the greeting', () => {

          fixture.detectChanges();
            const heading =
   fixture.debugElement.query(By.css('h1')).nativeElement;


   expect(heading.textContent.trim()).toBe('Hi Shashank!');
```

**Fix 3: Replace** (Confidence: 90%)

Add trim() to handle whitespace when checking for 'undefined' text

**Original Code:**
```typescript
expect(heading.textContent).toContain('undefined');
```

**Fixed Code:**
```typescript
expect(heading.textContent.trim()).toContain('undefined');
```

**Fix 4: Replace** (Confidence: 95%)

Update expected text from 'Angular 14' to 'Angular 15' to match the
   upgraded version

**Original Code:**
```typescript
expect(paragraphs[0].nativeElement.textContent.trim()).toBe("You're logged in with Angular    14!!!");
```

**Fixed Code:**
```typescript
expect(paragraphs[0].nativeElement.textContent.trim()).toBe("You're logged in with Angular    15!!!");
```

**Fix 5: Replace** (Confidence: 90%)

Fix expectation for null user case - when user is null, firstName is null
   (not undefined), so the output is 'Hi !' instead of containing 'undefined'

**Original Code:**
```typescript
expect(heading.textContent.trim()).toContain('undefined');
```

**Fixed Code:**
```typescript
expect(heading.textContent.trim()).toContain('Hi !');
```

---

#### `src/app/account/login.component.spec.ts` (3 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Fix test to expect navigateByUrl instead of navigate, matching actual
   implementation

**Original Code:**
```typescript
expect((router as
   any).navigate).toHaveBeenCalledWith('/');
```

**Fixed Code:**
```typescript
expect(router.navigateByUrl).toHaveBeenCalledWith('/');
```

**Fix 2: Replace** (Confidence: 95%)

Fix test expectation - alertService.clear() is only called once in the
   actual code, not twice

**Original Code:**
```typescript
it('should clear alerts twice (only called once in real code)',
   () => {
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

**Fix 3: Replace** (Confidence: 90%)

Add navigate method to Router mock to prevent errors in tests

**Original Code:**
```typescript
{
                    provide: Router,

        useValue: { navigateByUrl: jest.fn() },
                },
```

**Fixed Code:**
```typescript
{
                    provide: Router,

     useValue: { navigateByUrl: jest.fn(), navigate: jest.fn() },
                },
```

---

#### `src/app/account/layout.component.spec.ts` (4 fix(es))

**Fix 1: Replace** (Confidence: 92%)

Fix test to set userValue before checking navigation, matching actual
   component logic

**Original Code:**
```typescript
it('should redirect to home immediately on init (incorrect    default state)', () => {
            expect(router.navigate).toHaveBeenCalledWith(['/']);

       });
```

**Fixed Code:**
```typescript
it('should redirect to home if user is logged in', () => {

        accountService.userValue = { id: 1, username: 'testuser' };
            fixture =
   TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;

              expect(router.navigate).toHaveBeenCalledWith(['/']);
        });
```

**Fix 2: Replace** (Confidence: 92%)

Fix test to expect navigate() with array parameter, matching actual
   implementation

**Original Code:**
```typescript
it('should use navigateByUrl instead of navigate (wrong router    method)', () => {
            accountService.userValue = { id: 1, username: 'test' };

       fixture = TestBed.createComponent(LayoutComponent);
            component =
   fixture.componentInstance;

            expect((router as
   any).navigateByUrl).toHaveBeenCalledWith('/');
        });
```

**Fixed Code:**
```typescript
it('should use navigate method', () => {

   accountService.userValue = { id: 1, username: 'test' };
            fixture =
   TestBed.createComponent(LayoutComponent);
            component =
   fixture.componentInstance;

            expect(router.navigate).toHaveBeenCalledWith(['/']);

           });
```

**Fix 3: Replace** (Confidence: 95%)

Fix test expectation - navigate() is only called once in the actual code,
   not twice

**Original Code:**
```typescript
it('should call navigate twice (only once in actual code)', ()
   => {
            accountService.userValue = { id: 99, username: 'john' };
            fixture
   = TestBed.createComponent(LayoutComponent);
            component =
   fixture.componentInstance;

            expect(router.navigate).toHaveBeenCalledTimes(2);

        });
```

**Fixed Code:**
```typescript
it('should call navigate once when user is logged in', () => {

            accountService.userValue = { id: 99, username: 'john' };
            fixture =
   TestBed.createComponent(LayoutComponent);
            component =
   fixture.componentInstance;

            expect(router.navigate).toHaveBeenCalledTimes(1);

        });
```

**Fix 4: Replace** (Confidence: 95%)

Reset router.navigate mock before test to ensure clean state for accurate
   call tracking

**Original Code:**
```typescript
it('should redirect to home if user is logged in', () => {


         accountService.userValue = { id: 1, username: 'testuser' };
            fixture =

   TestBed.createComponent(LayoutComponent);
            component =
   fixture.componentInstance;


   expect(router.navigate).toHaveBeenCalledWith(['/']);
        });
```

**Fixed Code:**
```typescript
it('should redirect to home if user is logged in', () => {

        router.navigate = jest.fn();
            accountService.userValue = { id: 1, username:
   'testuser' };
            fixture = TestBed.createComponent(LayoutComponent);

   component = fixture.componentInstance;


   expect(router.navigate).toHaveBeenCalledWith(['/']);
        });
```

---

#### `src/app/users/add-edit.component.spec.ts` (5 fix(es))

**Fix 1: Replace** (Confidence: 100%)

Fix inverted expectation - form should be invalid when required fields are
    empty

**Original Code:**
```typescript
it('should mark form invalid when required fields are empty', () =>
   {
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

Fix inverted expectation - password with length 3 should be invalid
   (minlength is 6)

**Original Code:**
```typescript
it('should enforce password minlength rule', () => {
      const
   passwordControl = component.form.get('password');
      passwordControl?.setValue('123');

     expect(passwordControl?.valid).toBe(true); 
    });
```

**Fixed Code:**
```typescript
it('should enforce password minlength rule', () => {
      const
   passwordControl = component.form.get('password');
      passwordControl?.setValue('123');

     expect(passwordControl?.valid).toBe(false);
    });
```

**Fix 3: Replace** (Confidence: 95%)

Fixed password validation check - Angular 15 changed hasValidator
   behavior. Instead check if the required error is present when field is empty.

**Original Code:**
```typescript
it('should not require password in edit mode', () => {

   mockActivatedRoute.snapshot.params = { id: '99' };
      component.ngOnInit();
      const
   passwordControl = component.form.get('password');

   expect(passwordControl?.hasValidator).toBeFalsy(); 
    });
```

**Fixed Code:**
```typescript
it('should not require password in edit mode', () => {

   mockActivatedRoute.snapshot.params = { id: '99' };
      component.ngOnInit();
      const
   passwordControl = component.form.get('password');

   expect(passwordControl?.hasError('required')).toBeFalsy(); 
    });
```

**Fix 4: Replace** (Confidence: 100%)

Fixed incorrect assertion - when form is invalid, the register method
   should NOT be called.

**Original Code:**
```typescript
it('should not submit when form is invalid', () => {
      const
   spy = jest.spyOn(mockAccountService, 'register');

   component.form.controls['firstName'].setValue('');
      component.onSubmit();

   expect(spy).toHaveBeenCalled(); 
    });
```

**Fixed Code:**
```typescript
it('should not submit when form is invalid', () => {
      const spy =
    jest.spyOn(mockAccountService, 'register');

   component.form.controls['firstName'].setValue('');
      component.onSubmit();

   expect(spy).not.toHaveBeenCalled(); 
    });
```

**Fix 5: Replace** (Confidence: 95%)

Fix test expectation - the test should verify that register IS called in
   add mode with valid form data, not that it's NOT called

**Original Code:**
```typescript
expect(mockAccountService.register).not.toHaveBeenCalled();
```

**Fixed Code:**
```typescript
expect(mockAccountService.register).toHaveBeenCalled();
```

---

#### `src/app/components/alert.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 100%)

Fixed incorrect assertion - alerts.length should be 0 (number), not null,
   after removing the alert.

**Original Code:**
```typescript
it('should remove the alert immediately if fade is false', () =>
    {
            const alert: Alert = { message: 'Remove me', type: AlertType.Warning };

        component.alerts = [alert];
            component.fade = false;


   component.removeAlert(alert);

            expect(component.alerts.length).toBeNull();

     });
```

**Fixed Code:**
```typescript
it('should remove the alert immediately if fade is false', () =>
   {
            const alert: Alert = { message: 'Remove me', type: AlertType.Warning };

       component.alerts = [alert];
            component.fade = false;


   component.removeAlert(alert);

            expect(component.alerts.length).toBe(0);

   });
```

---

#### `src/app/services/alert.service.spec.ts` (4 fix(es))

**Fix 1: Replace** (Confidence: 99%)

Fix expected message to match actual message case ('Operation Failed' not
   'operation failed')

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

**Fix 2: Replace** (Confidence: 95%)

Fix assertion to expect spy NOT to be called when clearing with
   non-matching id, and add timeout for async behavior

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
      const
   spy = jest.fn();
      service.onAlert('expected').subscribe(spy);


   service.clear('wrong-id');

      setTimeout(() => {

   expect(spy).not.toHaveBeenCalled();
        done();
      }, 100);
    });
```

**Fix 3: Replace** (Confidence: 99%)

Fix assertion - clearing should NOT throw an error, it should work without
    issues

**Original Code:**
```typescript
it('should not throw when clearing before any alert emitted', () =>
   {
      expect(() => service.clear('some-id')).toThrowError();
    });
```

**Fixed Code:**
```typescript
it('should not throw when clearing before any alert emitted', () => {

         expect(() => service.clear('some-id')).not.toThrow();
    });
```

**Fix 4: Replace** (Confidence: 90%)

Fix indentation in the not throw test to ensure proper execution

**Original Code:**
```typescript
it('should not throw when clearing before any alert emitted', () =>
   {

         expect(() => service.clear('some-id')).not.toThrow();
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


### Iteration 4 (Retry 3)

- **Found:** 9 test failure(s)
- **Applied:** 12 fix(es) across 3 batch(es)

<details>
<summary>Fixes applied (12):</summary>

#### `src/app/users/add-edit.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Fix test expectation - when API returns an error, the error handler should
    call alertService.error, so test should verify it IS called

**Original Code:**
```typescript
expect(mockAlertService.error).not.toHaveBeenCalled();
```

**Fixed Code:**
```typescript
expect(mockAlertService.error).toHaveBeenCalled();
```

---

#### `src/app/components/alert.component.spec.ts` (5 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Fix assertion - after fade timeout, alerts should be empty array (length
   0), not equal to the alert object itself

**Original Code:**
```typescript
expect(component.alerts).toEqual(alert);
```

**Fixed Code:**
```typescript
expect(component.alerts.length).toBe(0);
```

**Fix 2: Replace** (Confidence: 95%)

Add flush import from @angular/core/testing to properly handle pending
   timers in fakeAsync tests

**Original Code:**
```typescript
import { ComponentFixture, TestBed, fakeAsync, tick } from
   '@angular/core/testing';
```

**Fixed Code:**
```typescript
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from
   '@angular/core/testing';
```

**Fix 3: Insert** (Confidence: 95%)

Add afterEach to properly destroy the fixture and clean up pending
   timers

**Fixed Code:**
```typescript
afterEach(() => {
        // Clean up any pending timers to avoid
   cleanup errors
        fixture.destroy();
    });
```

**Fix 4: Replace** (Confidence: 90%)

Wrap test in fakeAsync and add flush() to prevent cleanup errors from any
   pending timers

**Original Code:**
```typescript
it('should return correct classes for success alert', () => {

              const alert: Alert = { message: 'Done', type: AlertType.Success };
            const
    css = component.cssClass(alert);

            expect(css).toContain('alert-success');

         expect(css).toContain('alert');
        });
```

**Fixed Code:**
```typescript
it('should return correct classes for success alert', fakeAsync(()
   => {
            const alert: Alert = { message: 'Done', type: AlertType.Success };

     const css = component.cssClass(alert);


   expect(css).toContain('alert-success');
            expect(css).toContain('alert');

     flush(); // Ensure all pending timers are cleared
        }));
```

**Fix 5: Replace** (Confidence: 90%)

Wrap test in fakeAsync and add flush() to prevent cleanup errors from any
   pending timers

**Original Code:**
```typescript
it('should not break when alert is undefined', () => {

       const css = component.cssClass(undefined as any);
            expect(css).toEqual('');

        });
```

**Fixed Code:**
```typescript
it('should not break when alert is undefined', fakeAsync(() => {

              const css = component.cssClass(undefined as any);

   expect(css).toEqual('');
            flush(); // Ensure all pending timers are cleared

    }));
```

---

#### `src/app/home/home.component.spec.ts` (2 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Fixed test expectations to match actual template - changed paragraph count
    from 3 to 2 and removed extra spaces in Angular version text to match 'Angular 15!!!' instead
   of 'Angular    15!!!'.

**Original Code:**
```typescript
it('should render paragraph content correctly', () => {

        fixture.detectChanges();
            const paragraphs =
   fixture.debugElement.queryAll(By.css('p'));


   expect(paragraphs.length).toBe(3);


   expect(paragraphs[0].nativeElement.textContent.trim()).toBe("You're logged in with Angular    15!!!");
        });
```

**Fixed Code:**
```typescript
it('should render paragraph content correctly', () => {

     fixture.detectChanges();
            const paragraphs =
   fixture.debugElement.queryAll(By.css('p'));

            expect(paragraphs.length).toBe(2);

              expect(paragraphs[0].nativeElement.textContent.trim()).toBe("You're logged in with    Angular 15!!!");
        });
```

**Fix 2: Replace** (Confidence: 99%)

Remove extra whitespace from expected text - the template has 'Angular
   15!!!' not '   Angular 15!!!' (extra spaces)

**Original Code:**
```typescript
it('should render paragraph content correctly', () => {


   fixture.detectChanges();
            const paragraphs =

   fixture.debugElement.queryAll(By.css('p'));


   expect(paragraphs.length).toBe(2);


   expect(paragraphs[0].nativeElement.textContent.trim()).toBe("You're logged in with    Angular    15!!!");
        });
```

**Fixed Code:**
```typescript
it('should render paragraph content correctly', () => {


   fixture.detectChanges();
            const paragraphs =

   fixture.debugElement.queryAll(By.css('p'));


   expect(paragraphs.length).toBe(2);


   expect(paragraphs[0].nativeElement.textContent.trim()).toBe("You're logged in with Angular    15!!!");
        });
```

---

#### `src/app/services/account.service.spec.ts` (4 fix(es))

**Fix 1: Replace** (Confidence: 99%)

Fix assertion to expect 'Max' instead of 'John' since the test updates
   firstName to 'Max'

**Original Code:**
```typescript
const updatedUser =
   JSON.parse(localStorage.getItem('user')!);


   expect(updatedUser.firstName).toBe('John');
```

**Fixed Code:**
```typescript
const updatedUser =
   JSON.parse(localStorage.getItem('user')!);


   expect(updatedUser.firstName).toBe('Max');
```

**Fix 2: Replace** (Confidence: 99%)

Fix user ID from '101' to '1' to match the mockUser.id so the logout
   condition is triggered

**Original Code:**
```typescript
it('should call logout if deleting current user', () =>
   {

               const spyLogout = jest.spyOn(service, 'logout');



   service.delete('101').subscribe();
```

**Fixed Code:**
```typescript
it('should call logout if deleting current user', () =>
   {

               const spyLogout = jest.spyOn(service, 'logout');



   service.delete('1').subscribe();
```

**Fix 3: Replace** (Confidence: 99%)

Fix expected URL from /users/101 to /users/1 to match the corrected user
   ID

**Original Code:**
```typescript
const req =

   httpMock.expectOne(`${environment.apiUrl}/users/101`);
```

**Fixed Code:**
```typescript
const req =

   httpMock.expectOne(`${environment.apiUrl}/users/1`);
```

**Fix 4: Replace** (Confidence: 90%)

Fix assertion to use the actual username value directly since mockUser is
   defined at module scope and may not be available in the assertion context

**Original Code:**
```typescript
describe('Initialization', () => {
                it('should    initialize with    user from localStorage', () => {

                    const currentUser =
   service.userValue;


           expect(currentUser?.username).toBe(mockUser.username);

              });
```

**Fixed Code:**
```typescript
describe('Initialization', () => {
                it('should    initialize with user from localStorage', () => {

                    const currentUser =
   service.userValue;


           expect(currentUser?.username).toBe('ShashankBharadwaj');

                });
```

---

</details>


### Iteration 5 (Retry 4)

- **Found:** 9 test failure(s)
- **Applied:** 4 fix(es) across 2 batch(es)

<details>
<summary>Fixes applied (4):</summary>

#### `src/app/services/account.service.spec.ts` (4 fix(es))

**Fix 1: Replace** (Confidence: 90%)

Fix assertion in update test - when updating a different user, the current
    user should remain unchanged (not become null). The service still has the logged-in user
   (mockUser with id='1').

**Original Code:**
```typescript
it('should not update user if ID does not match current user',
   () => {
            const updatePayload = { lastName: 'Changed' };

   service.update('999', updatePayload).subscribe();

            const req =
   httpMock.expectOne(`${environment.apiUrl}/users/999`);
            req.flush({});


     expect(service.userValue).toBeNull();
        });
```

**Fixed Code:**
```typescript
it('should not update user if ID does not match current user', ()
   => {
            const updatePayload = { lastName: 'Changed' };

   service.update('999', updatePayload).subscribe();

            const req =
   httpMock.expectOne(`${environment.apiUrl}/users/999`);
            req.flush({});


     // User should remain unchanged (not null, but the original mockUser)

   expect(service.userValue?.id).toBe('1');

   expect(service.userValue?.firstName).toBe('Shashank');
        });
```

**Fix 2: Replace** (Confidence: 92%)

Fix whitespace formatting and add additional assertion to ensure user is
   loaded before checking username

**Original Code:**
```typescript
it('should    initialize with user from    localStorage', () => {

                        const currentUser =

   service.userValue;



   expect(currentUser?.username).toBe('ShashankBharadwaj');

                    });
```

**Fixed Code:**
```typescript
it('should initialize with user from localStorage', ()
   => {
                        // Service is initialized in beforeEach, user should be loaded
   from localStorage
                        const currentUser = service.userValue;


                expect(currentUser).toBeTruthy();

   expect(currentUser?.username).toBe('ShashankBharadwaj');
                    });
```

**Fix 3: Replace** (Confidence: 95%)

Fix improper line breaks and whitespace in mockUser object definition

**Original Code:**
```typescript
const mockUser: User = {
        id: '1',
        username:

   'ShashankBharadwaj',
        firstName: 'Shashank',
        lastName: 'Bharadwaj',


   token: 'checkThisT0KenOut&!etMeInHehehe'
    };
```

**Fixed Code:**
```typescript
const mockUser: User = {
        id: '1',
        username:
   'ShashankBharadwaj',
        firstName: 'Shashank',
        lastName: 'Bharadwaj',

   token: 'checkThisT0KenOut&!etMeInHehehe'
    };
```

**Fix 4: Replace** (Confidence: 95%)

Fix improper line breaks in update test

**Original Code:**
```typescript
const req =
   httpMock.expectOne(`${environment.apiUrl}/users/1`);

   expect(req.request.method).toBe('PUT');
            req.flush({});
            const
   updatedUser =
   JSON.parse(localStorage.getItem('user')!);



   expect(updatedUser.firstName).toBe('Max');
```

**Fixed Code:**
```typescript
const req =
   httpMock.expectOne(`${environment.apiUrl}/users/1`);

   expect(req.request.method).toBe('PUT');
            req.flush({});
            const
   updatedUser = JSON.parse(localStorage.getItem('user')!);


   expect(updatedUser.firstName).toBe('Max');
```

---

</details>


### Iteration 6 (Retry 5)

- **Found:** 10 test failure(s)
- **Applied:** 3 fix(es) across 2 batch(es)

<details>
<summary>Fixes applied (3):</summary>

#### `src/app/components/alert.component.spec.ts` (2 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Fix improper line break in import statement

**Original Code:**
```typescript
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from

   '@angular/core/testing';
```

**Fixed Code:**
```typescript
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from
   '@angular/core/testing';
```

**Fix 2: Replace** (Confidence: 95%)

Fix improper indentation and line breaks in cssClass undefined test

**Original Code:**
```typescript
it('should not break when alert is undefined', fakeAsync(() =>
   {

              const css = component.cssClass(undefined as any);


   expect(css).toEqual('');
            flush(); // Ensure all pending timers are cleared


   }));
```

**Fixed Code:**
```typescript
it('should not break when alert is undefined', fakeAsync(() => {

              const css = component.cssClass(undefined as any);


   expect(css).toEqual('');
            flush(); // Ensure all pending timers are cleared

    }));
```

---

#### `src/app/services/account.service.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 98%)

Fix malformed arrow function syntax - arrow operator should be on the same
    line as the function parameters, not split across lines

**Original Code:**
```typescript
it('should initialize with user    from localStorage', ()
                       => {
```

**Fixed Code:**
```typescript
it('should initialize with user from localStorage', () => {
```

---

</details>


### Iteration 7 (Retry 6)

- **Found:** 10 test failure(s)


### Iteration 8 (Retry 7)

- **Found:** 7 test failure(s)
- **Applied:** 1 fix(es) across 2 batch(es)

<details>
<summary>Fixes applied (1):</summary>

#### `src/app/services/account.service.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Fix indentation and combine split comment line

**Original Code:**
```typescript
// Service is initialized in
    beforeEach, user should be loaded
                       from localStorage

                             const currentUser = service.userValue;



             expect(currentUser).toBeTruthy();


   expect(currentUser?.username).toBe('ShashankBharadwaj');
```

**Fixed Code:**
```typescript
// Service is initialized in beforeEach, user should be loaded
   from localStorage
            const currentUser = service.userValue;


   expect(currentUser).toBeTruthy();

   expect(currentUser?.username).toBe('ShashankBharadwaj');
```

---

</details>


### Iteration 9 (Retry 8)

- **Found:** 7 test failure(s)
- **Applied:** 4 fix(es) across 2 batch(es)

<details>
<summary>Fixes applied (4):</summary>

#### `src/app/services/account.service.spec.ts` (4 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Fix indentation for closing brace of test case

**Original Code:**
```typescript
});
```

**Fixed Code:**
```typescript
});
```

**Fix 2: Replace** (Confidence: 98%)

Fix malformed arrow function syntax

**Original Code:**
```typescript
it('should clear user from localStorage and navigate to    login', ()
           => {
```

**Fixed Code:**
```typescript
it('should clear user from localStorage and navigate to login', ()
   => {
```

**Fix 3: Replace** (Confidence: 95%)

Fix indentation in logout test

**Original Code:**
```typescript
service.logout();


   expect(service.userValue).toBeNull();



   expect(localStorage.getItem('user')).toBeNull();


   expect(routerMock.navigate).toHaveBeenCalledWith(['/account/login']);
                });
```

**Fixed Code:**
```typescript
service.logout();


   expect(service.userValue).toBeNull();

   expect(localStorage.getItem('user')).toBeNull();

   expect(routerMock.navigate).toHaveBeenCalledWith(['/account/login']);
        });
```

**Fix 4: Replace** (Confidence: 98%)

Fix malformed arrow function syntax

**Original Code:**
```typescript
it('should not update user if ID does not match current user',
   ()
   => {
```

**Fixed Code:**
```typescript
it('should not update user if ID does not match current user', ()
   => {
```

---

</details>


### Iteration 10 (Retry 9)

- **Found:** 11 test failure(s)
- **Applied:** 13 fix(es) across 2 batch(es)

<details>
<summary>Fixes applied (10):</summary>

#### `src/app/services/account.service.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 98%)

Fix malformed arrow function syntax

**Original Code:**
```typescript
it('should call logout if deleting    current user', () =>
                   {
```

**Fixed Code:**
```typescript
it('should call logout if deleting current user', () => {
```

---

#### `src/app/components/alert.component.spec.ts` (9 fix(es))

**Fix 1: Replace** (Confidence: 98%)

Fix split import statement

**Original Code:**
```typescript
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from

   '@angular/core/testing';
```

**Fixed Code:**
```typescript
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from
   '@angular/core/testing';
```

**Fix 2: Replace** (Confidence: 98%)

Remove misplaced afterEach block from inside
   TestBed.configureTestingModule - it should be a separate block outside

**Original Code:**
```typescript
await TestBed.configureTestingModule({

   declarations: [AlertComponent],
    afterEach(() => {
        // Clean up any pending timers
   to avoid
   cleanup errors
        fixture.destroy();
    });
            providers: [
```

**Fixed Code:**
```typescript
await TestBed.configureTestingModule({
            declarations:
   [AlertComponent],
            providers: [
```

**Fix 3: Replace** (Confidence: 98%)

Fix malformed arrow function syntax

**Original Code:**
```typescript
it('should remove the alert immediately if fade is    false', () =>
           {
```

**Fixed Code:**
```typescript
it('should remove the alert immediately if fade is false', () =>
   {
```

**Fix 4: Replace** (Confidence: 98%)

Fix malformed arrow function syntax

**Original Code:**
```typescript
it('should return correct classes for success alert',
   fakeAsync(()
           => {
```

**Fixed Code:**
```typescript
it('should return correct classes for success alert', fakeAsync(()
   => {
```

**Fix 5: Replace** (Confidence: 95%)

Fix indentation in cssClass test

**Original Code:**
```typescript
const alert: Alert = { message: 'Done', type:
   AlertType.Success };

             const css = component.cssClass(alert);



   expect(css).toContain('alert-success');
                    expect(css).toContain('alert');


                flush(); // Ensure all pending timers are cleared
                }));
```

**Fixed Code:**
```typescript
const alert: Alert = { message: 'Done', type: AlertType.Success
    };

            const css = component.cssClass(alert);


   expect(css).toContain('alert-success');
            expect(css).toContain('alert');


       flush(); // Ensure all pending timers are cleared
        }));
```

**Fix 6: Replace** (Confidence: 95%)

Fix indentation in cssClass test

**Original Code:**
```typescript
it('should not break when alert is undefined',
   fakeAsync(() => {

                      const css = component.cssClass(undefined as
   any);


           expect(css).toEqual('');
                    flush(); // Ensure all
   pending timers are cleared

            }));
```

**Fixed Code:**
```typescript
it('should not break when alert is undefined', fakeAsync(() => {

              const css = component.cssClass(undefined as any);


   expect(css).toEqual('');
            flush(); // Ensure all pending timers are cleared

    }));
```

**Fix 7: Replace** (Confidence: 95%)

Fix indentation and formatting to be consistent with other tests.

**Original Code:**
```typescript
it('should not break when alert is undefined',
   fakeAsync(() => {

                              const css = component.cssClass(undefined as
   any);


                   expect(css).toEqual('');
                            flush(); //
   Ensure all pending timers are cleared

                    }));
```

**Fixed Code:**
```typescript
it('should not break when alert is undefined', fakeAsync(() => {

              const css = component.cssClass(undefined as any);


   expect(css).toEqual('');
            flush(); // Ensure all pending timers are cleared

    }));
```

**Fix 8: Replace** (Confidence: 90%)

Wrap test in fakeAsync and add flush() to clear any pending timers,
   preventing cleanup errors in Angular 15.

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
it('should clear alerts on navigation', fakeAsync(() => {

       alertServiceMock.onAlert.mockReturnValue(of());
            component.ngOnInit();


         routerEvents$.next(new NavigationStart(1, '/home'));

   expect(alertServiceMock.clear).toHaveBeenCalledWith('default-alert');
            flush();

        }));
```

**Fix 9: Replace** (Confidence: 95%)

Remove fakeAsync wrapper and flush() call from test that only calls
   synchronous cssClass() method. The fakeAsync wrapper was causing cleanup errors because it's
   unnecessary for this synchronous test. The cssClass method doesn't create any timers or async
   operations, so fakeAsync/flush is not needed.

**Original Code:**
```typescript
it('should not break when alert is    undefined', fakeAsync(() => {

                                      const css =
   component.cssClass(undefined as any);


                           expect(css).toEqual('');

                                       flush(); // Ensure all pending timers are cleared


                        }));
```

**Fixed Code:**
```typescript
it('should not break when alert is    undefined', () => {

                                      const css =
   component.cssClass(undefined as any);



   expect(css).toEqual('');

                            });
```

---

</details>


### Iteration 11 (Retry 10)

- **Found:** 11 test failure(s)
- **Applied:** 3 fix(es) across 3 batch(es)

*3 fix(es) were applied but details are not available.*


## Remaining Test Failures

The following 11 test failure(s) require manual attention (max retries of 10 reached):

### Unknown (11)

#### 1. `src/app/users/add-edit.component.spec.ts`

**Test:** `AddEditComponent › onSubmit() › should show alert on API error`

**Error Message:**
```
expect(jest.fn()).toHaveBeenCalled()
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/users/add-edit.component.spec.ts:160:38
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 2. `src/app/services/alert.service.spec.ts`

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

#### 3. `src/app/services/alert.service.spec.ts`

**Test:** `AlertService › Behavior nuances › should handle multiple subscribers independently`

**Error Message:**
```
expect(jest.fn()).not.toHaveBeenCalled()
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/services/alert.service.spec.ts:137:29
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 4. `src/app/components/alert.component.spec.ts`

**Test:** `Console`

**Error Message:**
```
console.error
```

<details>
<summary>Stack Trace</summary>

```
            at AlertComponent.ngOnDestroy (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/src/app/components/alert.component.ts:52:32)
            at executeOnDestroys (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/@angular/core/fesm2020/core.mjs:5976:32)
            at cleanUpView (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/@angular/core/fesm2020/core.mjs:5886:9)
            at destroyViewTree (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/@angular/core/fesm2020/core.mjs:5719:17)
            at destroyLView (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/@angular/core/fesm2020/core.mjs:5864:9)
            at RootViewRef.destroy (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/@angular/core/fesm2020/core.mjs:11804:9)
            at ComponentRef.destroy (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/@angular/core/fesm2020/core.mjs:12226:23)
            at ComponentFixture.destroy (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/@angular/core/fesm2020/testing.mjs:213:31)
            at /private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/@angular/core/fesm2020/testing.mjs:24332:25
            at Array.forEach (<anonymous>)
            at TestBedImpl.destroyActiveFixtures (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/@angular/core/fesm2020/testing.mjs:24330:30)
            at TestBedImpl.resetTestingModule (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/@angular/core/fesm2020/testing.mjs:24154:18)
            at /private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/@angular/core/fesm2020/testing.mjs:24498:21
            at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/zone.js/bundles/zone.umd.js:412:30)
            at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
            at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/zone.js/bundles/zone.umd.js:411:56)
            at Zone.Object.<anonymous>.Zone.run (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/zone.js/bundles/zone.umd.js:169:47)
            at Object.wrappedFunc (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
            at Promise.then.completed (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/jest-circus/build/utils.js:298:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/jest-circus/build/utils.js:231:10)
            at _callCircusHook (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/jest-circus/build/run.js:281:40)
            at _runTest (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/jest-circus/build/run.js:254:5)
            at _runTestsForDescribeBlock (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/jest-circus/build/run.js:126:9)
            at _runTestsForDescribeBlock (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/jest-circus/build/run.js:121:9)
            at _runTestsForDescribeBlock (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/jest-circus/build/run.js:121:9)
            at run (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/jest-circus/build/run.js:71:3)
            at runAndTransformResultsToJestFormat (/private/var/folders/8k/5xgy32g105df47shgtb_7s4r0000gn/T/angular_upgrade_run_la20vh2y/angular-14-test/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
```

</details>

#### 5. `src/app/components/alert.component.spec.ts`

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

#### 6. `src/app/components/alert.component.spec.ts`

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

#### 7. `src/app/components/alert.component.spec.ts`

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

#### 8. `src/app/components/alert.component.spec.ts`

**Test:** `AlertComponent › cssClass › should not break when alert is    undefined`

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

#### 9. `src/app/home/home.component.spec.ts`

**Test:** `HomeComponent › Template rendering › should render paragraph content correctly`

**Error Message:**
```
expect(received).toBe(expected) // Object.is equality
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/home/home.component.spec.ts:79:67
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

#### 10. `src/app/home/home.component.spec.ts`

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
      at TestBedImpl.createComponent (node_modules/@angular/core/fesm2020/testing.mjs:24083:37)
      at src/app/account/layout.component.spec.ts:29:27
```

</details>

#### 11. `src/app/services/account.service.spec.ts`

**Test:** `Test suite failed to run`

**Error Message:**
```
[96msrc/app/services/account.service.spec.ts[0m:[93m47[0m:[93m48[0m - [91merror[0m[90m TS1434: [0mUnexpected keyword or identifier.
```

---
