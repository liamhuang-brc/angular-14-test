import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

import { RegisterComponent } from './register.component';
import { AccountService, AlertService } from '../services';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let accountServiceSpy: jasmine.SpyObj<AccountService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['register']);
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['clear', 'success', 'error']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
   fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
   expect(component).toBeTruthy();
  });
  it('should initialize form with empty fields', () => {
    const formValues = component.form.value;
   expect(formValues.firstName).toBe('');
   expect(formValues.password).toBe('');
  });

  it('should mark form invalid if required fields missing', () => {
   component.onSubmit();
   expect(component.form.invalid).toBeTrue();
  });
  it('should call register service when form is valid', () => {
   component.form.setValue({
      firstName: 'John',
   lastName: 'Doe',
      username: 'jdoe',
      password: 'password123'
    });
   accountServiceSpy.register.and.returnValue(of({}));

    component.onSubmit();

   expect(accountServiceSpy.register).toHaveBeenCalledWith(jasmine.objectContaining({
   firstName: 'John'
    }));
  });
  it('should handle registration error gracefully', () => {
   component.form.setValue({
      firstName: 'Jane',
   lastName: 'Doe',
      username: 'janedoe',
      password: '123456'
    });
   accountServiceSpy.register.and.returnValue(throwError(() => 'Server error'));

   component.onSubmit();

    expect(alertServiceSpy.error).toHaveBeenCalled();
  });
  it('should not call register if form is invalid', () => {
   component.form.controls['firstName'].setValue('');
   component.onSubmit();
   expect(accountServiceSpy.register).not.toHaveBeenCalled();
  });
});
