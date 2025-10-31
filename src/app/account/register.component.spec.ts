import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

import { RegisterComponent } from './register.component';
import { AccountService, AlertService } from '../services';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let accountServiceSpy: jest.Mocked<AccountService>;
  let alertServiceSpy: jest.Mocked<AlertService>;
  let routerSpy: jest.Mocked<Router>;

  beforeEach(async () => {
    accountServiceSpy = {
      register: jest.fn(),
      user: of(null),
      userValue: null,
      login: jest.fn(),
      logout: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    } as any;
    alertServiceSpy = {
      clear: jest.fn(),
      success: jest.fn(),
      error: jest.fn()
    } as unknown as jest.Mocked<AlertService>;
    routerSpy = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

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
    expect(component.form.invalid).toBe(true);
  });

  it('should call register service when form is valid', () => {
    component.form.setValue({
      firstName: 'John',
      lastName: 'Doe',
      username: 'jdoe',
      password: 'password123'
    });
    accountServiceSpy.register.mockReturnValue(of({}));

    component.onSubmit();

    expect(accountServiceSpy.register).toHaveBeenCalledWith(expect.objectContaining({
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
    accountServiceSpy.register.mockReturnValue(throwError(() => 'Server error'));

    component.onSubmit();

    expect(alertServiceSpy.error).toHaveBeenCalled();
  });

  it('should not call register if form is invalid', () => {
    component.form.controls['firstName'].setValue('');
    component.onSubmit();
    expect(accountServiceSpy.register).not.toHaveBeenCalled();
  });
});
