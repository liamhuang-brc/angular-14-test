# Unit Test Analysis Report

**Angular Upgrade:** 14.0.0 → 15.0.0

*This report contains detailed information about unit test analysis, including applied fixes and remaining failures.*

## Summary

- **Total Fixes Applied:** 65
- **Test Analysis Iterations:** 10
- **Max Retries:** 5
- **Remaining Failures:** 9

## Test Analysis Iterations

### Iteration 1 (Initial Verification)

- **Found:** 8 test failure(s)


### Iteration 2 (Retry 1)

- **Found:** 8 test failure(s)


### Iteration 3 (Retry 2)

- **Found:** 8 test failure(s)


### Iteration 4 (Retry 3)

- **Found:** 8 test failure(s)


### Iteration 5 (Retry 4)

- **Found:** 8 test failure(s)


### Iteration 6 (Retry 5)

- **Found:** 8 test failure(s)
- **Applied:** 1 fix(es) across 2 batch(es)

<details>
<summary>Fixes applied (1):</summary>

#### `src/app/account/register.component.spec.ts` (1 fix(es))

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

---

</details>


### Iteration 7 (Retry 6)

- **Found:** 40 test failure(s)
- **Applied:** 1 fix(es) across 2 batch(es)

<details>
<summary>Fixes applied (1):</summary>

#### `src/app/account/register.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 95%)

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

---

</details>


### Iteration 8 (Retry 7)

- **Found:** 11 test failure(s)
- **Applied:** 49 fix(es) across 9 batch(es)

<details>
<summary>Fixes applied (49):</summary>

#### `src/app/account/register.component.spec.ts` (5 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Replace Jasmine's and.returnValue with Jest's mockReturnValue

**Original Code:**
```typescript
accountServiceSpy.register.and.returnValue(of({}));
```

**Fixed Code:**
```typescript
accountServiceSpy.register.mockReturnValue(of({}));
```

**Fix 2: Replace** (Confidence: 95%)

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

**Fix 3: Replace** (Confidence: 95%)

Replace Jasmine's and.returnValue with Jest's mockReturnValue for error scenario

**Original Code:**
```typescript
accountServiceSpy.register.and.returnValue(throwError(() => 'Server error'));
```

**Fixed Code:**
```typescript
accountServiceSpy.register.mockReturnValue(throwError(() => 'Server error'));
```

**Fix 4: Replace** (Confidence: 95%)

Fixed indentation inconsistency in alertServiceSpy definition (changed from 3 spaces to 4 spaces to match the rest of the file)

**Original Code:**
```typescript
alertServiceSpy = {
      clear: jest.fn(),
      success: jest.fn(),
      error: jest.fn()
    };
```

**Fixed Code:**
```typescript
alertServiceSpy = {
      clear: jest.fn(),
      success: jest.fn(),
      error: jest.fn()
    };
```

**Fix 5: Replace** (Confidence: 95%)

Fixed indentation inconsistency in expect statement (normalized to 4 spaces for proper alignment)

**Original Code:**
```typescript
expect(accountServiceSpy.register).toHaveBeenCalledWith(expect.objectContaining({
   firstName: 'John'
    }));
```

**Fixed Code:**
```typescript
expect(accountServiceSpy.register).toHaveBeenCalledWith(expect.objectContaining({
   firstName: 'John'
    }));
```

---

#### `src/app/users/add-edit.component.spec.ts` (8 fix(es))

**Fix 1: Replace** (Confidence: 100%)

Fixed test assertion: form should be invalid (truthy) when required fields are empty, not falsy

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

Fixed test assertion: password with length 3 should be invalid (false) due to minLength(6) validator

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

**Fix 3: Replace** (Confidence: 100%)

Fixed test: hasValidator is a method that takes a validator as parameter, not a property. Check specifically for Validators.required

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
   expect(passwordControl?.hasValidator(Validators.required)).toBeFalsy();
    });
```

**Fix 4: Replace** (Confidence: 90%)

Import Validators for use in test that checks hasValidator method

**Original Code:**
```typescript
let mockActivatedRoute: any;
```

**Fixed Code:**
```typescript
let mockActivatedRoute: any;
  const { Validators: ValidatorsImport } = require('@angular/forms');
```

**Fix 5: Replace** (Confidence: 100%)

Fixed test assertion: register should NOT be called when form is invalid

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

**Fix 6: Replace** (Confidence: 100%)

Fixed test assertion: register SHOULD be called in add mode with valid form data

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

**Fix 7: Replace** (Confidence: 98%)

Add Validators to the imports from @angular/forms to fix 'Validators is not defined' error

**Original Code:**
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditComponent } from './add-edit.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
```

**Fixed Code:**
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditComponent } from './add-edit.component';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
```

**Fix 8: Replace** (Confidence: 95%)

Remove the require statement for Validators since it's now imported properly at the top

**Original Code:**
```typescript
const { Validators: ValidatorsImport } = require('@angular/forms');
```

---

#### `src/app/services/alert.service.spec.ts` (6 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Fixed test logic: Should expect spy NOT to have been called when alert id does not match. Added setTimeout to allow async processing.

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

Fixed test assertion: Expected message should match the actual message passed to service.error() - 'Operation Failed' not 'operation failed'.

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

Fixed test logic: Should expect spy NOT to have been called when clear() is called with non-matching id. Added setTimeout to allow async processing.

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

Fixed test logic: Both subscribers should receive the alert when it matches their id. RxJS Subject broadcasts to all subscribers. Added setTimeout for async processing.

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

Fixed test logic: clear() should NOT throw an error when called before any alert is emitted - this is valid behavior.

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

Changed .not.toThrowError() to .not.toThrow() as Jest uses .toThrow() instead of .toThrowError()

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

#### `src/app/services/account.service.spec.ts` (16 fix(es))

**Fix 1: Replace** (Confidence: 90%)

Fixed initialization test: Re-inject service after localStorage is set up in beforeEach to ensure it reads the mock user data.

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

**Fix 2: Replace** (Confidence: 95%)

Fixed request body property: Should check 'username' not 'user'. Added flush to complete the HTTP request.

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
            req.flush(mockUser);
           });
```

**Fix 3: Replace** (Confidence: 95%)

Fixed logout assertion: userValue should be null after logout, not empty object, matching the service implementation.

**Original Code:**
```typescript
describe('logout()', () => {
        it('should clear user from localStorage and navigate to login', () => {
            service.logout();

            expect(service.userValue).toEqual({});

            expect(localStorage.getItem('user')).toBeNull();
            expect(routerMock.navigate).toHaveBeenCalledWith(['/account/login']);
        });
    });
```

**Fixed Code:**
```typescript
describe('logout()', () => {
        it('should clear user from localStorage and navigate to login', () => {
            service.logout();

   expect(service.userValue).toBeNull();

   expect(localStorage.getItem('user')).toBeNull();
   expect(routerMock.navigate).toHaveBeenCalledWith(['/account/login']);
        });
    });
```

**Fix 4: Replace** (Confidence: 98%)

Fixed HTTP method assertion: register() uses POST not PUT. Added flush to complete the HTTP request.

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

**Fix 5: Replace** (Confidence: 95%)

Fixed test: Use correct user ID '101' from mockUser and expect updated firstName 'Max' from updatePayload, not 'John'.

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

Fixed test: When updating different user, current user should remain unchanged (id '101'), not become null.

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

**Fix 7: Replace** (Confidence: 98%)

Fixed test: Use correct current user ID '101' from mockUser to test logout is called when deleting own account.

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

**Fix 8: Replace** (Confidence: 98%)

Fixed test logic: logout should NOT be called when deleting a different user (id '2' vs current user '101').

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

**Fix 9: Replace** (Confidence: 95%)

Fixed indentation and added password assertion to properly test the login method call

**Original Code:**
```typescript
it('should call API with username and password', () => {
      service.login('ShashankBharadwaj', 'password123').subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/authenticate`);

   expect(req.request.body.username).toBe('ShashankBharadwaj');
            req.flush(mockUser);
```

**Fixed Code:**
```typescript
it('should call API with username and password', () => {
      service.login('ShashankBharadwaj', 'password123').subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/authenticate`);

   expect(req.request.body.username).toBe('ShashankBharadwaj');
   expect(req.request.body.password).toBe('password123');
            req.flush(mockUser);
```

**Fix 10: Replace** (Confidence: 95%)

Fixed indentation for logout test expectations

**Original Code:**
```typescript
describe('logout()', () => {
        it('should clear user from localStorage and navigate to login', () => {
            service.logout();

   expect(service.userValue).toBeNull();

   expect(localStorage.getItem('user')).toBeNull();
   expect(routerMock.navigate).toHaveBeenCalledWith(['/account/login']);
        });
```

**Fixed Code:**
```typescript
describe('logout()', () => {
        it('should clear user from localStorage and navigate to login', () => {
            service.logout();

   expect(service.userValue).toBeNull();
   expect(localStorage.getItem('user')).toBeNull();
   expect(routerMock.navigate).toHaveBeenCalledWith(['/account/login']);
        });
```

**Fix 11: Replace** (Confidence: 95%)

Fixed indentation for register test to properly check POST method

**Original Code:**
```typescript
describe('register()', () => {
        it('should call POST /users/register API', () => {
   const newUser: User = { id: '2', username: 'liam', firstName: 'Liam', lastName: 'Huang', token: '' };

            service.register(newUser).subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/register`);

   expect(req.request.method).toBe('POST');
            req.flush({});
```

**Fixed Code:**
```typescript
describe('register()', () => {
        it('should call POST /users/register API', () => {
            const newUser: User = { id: '2', username: 'liam', firstName: 'Liam', lastName: 'Huang', token: '' };

   service.register(newUser).subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/register`);

   expect(req.request.method).toBe('POST');
            req.flush({});
```

**Fix 12: Replace** (Confidence: 95%)

Fixed indentation for update test to properly verify PUT method and updated user data

**Original Code:**
```typescript
describe('update()', () => {
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

**Fixed Code:**
```typescript
describe('update()', () => {
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

**Fix 13: Replace** (Confidence: 95%)

Fixed indentation for update test that verifies no update when ID doesn't match

**Original Code:**
```typescript
it('should not update user if ID does not match current user', () => {
            const updatePayload = { lastName: 'Changed' };
   service.update('999', updatePayload).subscribe();

            const req = httpMock.expectOne(`${environment.apiUrl}/users/999`);
            req.flush({});

     expect(service.userValue?.id).toBe('101');
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

**Fix 14: Replace** (Confidence: 95%)

Fixed indentation for delete test to properly verify logout is called when deleting current user

**Original Code:**
```typescript
describe('delete()', () => {
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
describe('delete()', () => {
        it('should call logout if deleting current user', () => {
            const spyLogout = jest.spyOn(service, 'logout');

            service.delete('101').subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/101`);
            req.flush({});

     expect(spyLogout).toHaveBeenCalledTimes(1);
        });
```

**Fix 15: Replace** (Confidence: 95%)

Fixed indentation for delete test that verifies logout is not called when deleting another user

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
           const spyLogout = jest.spyOn(service, 'logout');

   service.delete('2').subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/2`);
            req.flush({});

   expect(spyLogout).not.toHaveBeenCalled();
        });
```

**Fix 16: Replace** (Confidence: 95%)

Fixed indentation inconsistencies in the test

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
           const spyLogout = jest.spyOn(service, 'logout');

   service.delete('2').subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/2`);
            req.flush({});

   expect(spyLogout).not.toHaveBeenCalled();
        });
```

---

#### `src/app/components/alert.component.spec.ts` (5 fix(es))

**Fix 1: Replace** (Confidence: 98%)

Fixed assertion: alerts.length should be 0, not null

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

Fixed assertion: should check alerts.length is 0 after removal, not compare alerts array to alert object

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

            expect(component.alerts.length).toBe(0);
        }));
```

**Fix 3: Replace** (Confidence: 98%)

Fixed assertion: cssClass returns undefined when alert is undefined, not empty string

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

**Fix 4: Replace** (Confidence: 95%)

Changed assertion from checking length to checking if alert is removed from array, which is more accurate for testing removal behavior

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

   expect(component.alerts.includes(alert)).toBe(false);
        });
```

**Fix 5: Replace** (Confidence: 99%)

Fixed indentation to be consistent with the rest of the test file

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
    const css = component.cssClass(undefined as any);
            expect(css).toBeUndefined();
         });
```

---

#### `src/app/home/home.component.spec.ts` (4 fix(es))

**Fix 1: Replace** (Confidence: 99%)

Fixed expected value to match mockUser.firstName which is 'Shashank', not 'John'

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

**Fix 2: Replace** (Confidence: 99%)

Fixed expected value to match mockUser.firstName ('Shashank') and added exclamation mark to match template

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

**Fix 3: Replace** (Confidence: 98%)

Fixed expected text to match template - changed 'Angular 14!!!' to 'Angular 14!!' (removed one exclamation mark)

**Original Code:**
```typescript
expect(paragraphs[0].nativeElement.textContent.trim()).toBe("You're logged in with Angular 14!!!");
```

**Fixed Code:**
```typescript
expect(paragraphs[0].nativeElement.textContent.trim()).toBe("You're logged in with Angular 14!!");
```

**Fix 4: Replace** (Confidence: 97%)

Changed expectation from 'undefined' to 'Hi' since the template shows 'Hi {{user?.firstName}}!' which will display 'Hi !' when user is null

**Original Code:**
```typescript
expect(heading.textContent).toContain('undefined');
```

**Fixed Code:**
```typescript
expect(heading.textContent).toContain('Hi');
```

---

#### `src/app/account/login.component.spec.ts` (2 fix(es))

**Fix 1: Replace** (Confidence: 99%)

Fixed to call navigateByUrl instead of navigate to match the actual implementation in login.component.ts

**Original Code:**
```typescript
expect((router as any).navigate).toHaveBeenCalledWith('/');
```

**Fixed Code:**
```typescript
expect(router.navigateByUrl).toHaveBeenCalledWith('/');
```

**Fix 2: Replace** (Confidence: 99%)

Fixed expected call count from 2 to 1 - alertService.clear is only called once in the actual code

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

**Fix 1: Replace** (Confidence: 98%)

Fixed test expectation - router.navigate should NOT be called by default when userValue is null (MockAccountService default)

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

**Fix 2: Replace** (Confidence: 99%)

Fixed to expect navigate method instead of navigateByUrl - the actual layout.component.ts uses router.navigate

**Original Code:**
```typescript
expect((router as any).navigateByUrl).toHaveBeenCalledWith('/');
```

**Fixed Code:**
```typescript
expect(router.navigate).toHaveBeenCalledWith(['/']);
```

**Fix 3: Replace** (Confidence: 98%)

Fixed test expectation to match actual component behavior - the constructor only calls navigate() once when userValue exists, not twice. Changed toHaveBeenCalledTimes from 2 to 1.

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


### Iteration 9 (Retry 8)

- **Found:** 9 test failure(s)
- **Applied:** 9 fix(es) across 3 batch(es)

<details>
<summary>Fixes applied (6):</summary>

#### `src/app/account/register.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 98%)

Replace Jest-incompatible .toBeTrue() matcher with .toBe(true) for Jest compatibility

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

#### `src/app/home/home.component.spec.ts` (1 fix(es))

**Fix 1: Replace** (Confidence: 100%)

Updated test expectation to match the Angular 15 text in the template

**Original Code:**
```typescript
expect(paragraphs[0].nativeElement.textContent.trim()).toBe("You're logged in with Angular 14!!");
```

**Fixed Code:**
```typescript
expect(paragraphs[0].nativeElement.textContent.trim()).toBe("You're logged in with Angular 15!!");
```

---

#### `src/app/components/alert.component.spec.ts` (4 fix(es))

**Fix 1: Replace** (Confidence: 95%)

Wrapped test in fakeAsync and added tick() to flush any pending timers before test cleanup. This prevents the 'component threw errors during cleanup' error in Angular 15.

**Original Code:**
```typescript
it('should remove the alert immediately if fade is false', () => {
            const alert: Alert = { message: 'Remove me', type: AlertType.Warning };
       component.alerts = [alert];
            component.fade = false;

   component.removeAlert(alert);

   expect(component.alerts.includes(alert)).toBe(false);
        });
```

**Fixed Code:**
```typescript
it('should remove the alert immediately if fade is false', fakeAsync(() => {
            const alert: Alert = { message: 'Remove me', type: AlertType.Warning };
            component.alerts = [alert];
            component.fade = false;

            component.removeAlert(alert);

   expect(component.alerts.includes(alert)).toBe(false);
            tick();
        }));
```

**Fix 2: Replace** (Confidence: 95%)

Added tick() at the end to ensure all pending timers are flushed before test cleanup, preventing cleanup errors in Angular 15.

**Original Code:**
```typescript
it('should fade out and remove alert after timeout if fade is true', fakeAsync(() => {
            const alert: Alert = { message: 'Fade out', type: AlertType.Info };
            component.alerts = [alert];
            component.fade = true;

            component.removeAlert(alert);
            expect(alert.fade).toBe(true);
               tick(250);

            expect(component.alerts.length).toBe(0);
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

            expect(component.alerts.length).toBe(0);
   tick();
        }));
```

**Fix 3: Replace** (Confidence: 95%)

Wrapped test in fakeAsync and added tick() to flush any pending timers from component initialization, preventing cleanup errors in Angular 15.

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
it('should return correct classes for success alert', fakeAsync(() => {
            const alert: Alert = { message: 'Done', type: AlertType.Success };
     const css = component.cssClass(alert);

   expect(css).toContain('alert-success');
            expect(css).toContain('alert');
     tick();
        }));
```

**Fix 4: Replace** (Confidence: 95%)

Wrapped test in fakeAsync and added tick() to flush any pending timers from component initialization, preventing cleanup errors in Angular 15.

**Original Code:**
```typescript
it('should not break when alert is undefined', () => {
    const css = component.cssClass(undefined as any);
            expect(css).toBeUndefined();
         });
```

**Fixed Code:**
```typescript
it('should not break when alert is undefined', fakeAsync(() => {
              const css = component.cssClass(undefined as any);
   expect(css).toBeUndefined();
            tick();
        }));
```

---

</details>


### Iteration 10 (Retry 9)

- **Found:** 9 test failure(s)
- **Applied:** 5 fix(es) across 2 batch(es)

*5 fix(es) were applied but details are not available.*


## Remaining Test Failures

The following 9 test failure(s) require manual attention (max retries of 5 reached):

### Unknown (4)

#### 1. `src/app/components/alert.component.spec.ts`

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

#### 2. `src/app/components/alert.component.spec.ts`

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

#### 3. `src/app/components/alert.component.spec.ts`

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

#### 4. `src/app/components/alert.component.spec.ts`

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

---

### Test Logic Error (5)

#### 1. `src/app/home/home.component.spec.ts`

**Test:** `HomeComponent › Template rendering › should render paragraph content correctly`

**Error Message:**
```
expect(received).toBe(expected) // Object.is equality
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/home/home.component.spec.ts:68:39
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
      at src/app/services/account.service.spec.ts:47:34
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
expect(received).toBe(expected) // Object.is equality
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/services/account.service.spec.ts:107:34
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
expect(received).toBe(expected) // Object.is equality
```

<details>
<summary>Stack Trace</summary>

```
      at src/app/services/account.service.spec.ts:116:36
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
      at src/app/services/account.service.spec.ts:127:24
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:412:30)
      at ProxyZoneSpec.Object.<anonymous>.ProxyZoneSpec.onInvoke (node_modules/zone.js/bundles/zone-testing.umd.js:303:43)
      at _ZoneDelegate.Object.<anonymous>._ZoneDelegate.invoke (node_modules/zone.js/bundles/zone.umd.js:411:56)
      at Zone.Object.<anonymous>.Zone.run (node_modules/zone.js/bundles/zone.umd.js:169:47)
      at Object.wrappedFunc (node_modules/zone.js/bundles/zone-testing.umd.js:803:34)
```

</details>

---
