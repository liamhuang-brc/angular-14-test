import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

import { RegisterComponent } from './register.component';
import { AccountService, AlertService } from '../services';

class MockAccountService {
  register = jest.fn();
}

class MockAlertService {
  clear = jest.fn();
  success = jest.fn();
  error = jest.fn();
}

class MockRouter {
  navigate = jest.fn();
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let accountService: MockAccountService;
  let alertService: MockAlertService;
  let router: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RegisterComponent],
      providers: [
        { provide: AccountService, useClass: MockAccountService },
        { provide: AlertService, useClass: MockAlertService },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService) as unknown as MockAccountService;
    alertService = TestBed.inject(AlertService) as unknown as MockAlertService;
    router = TestBed.inject(Router) as unknown as MockRouter;
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
    accountService.register.mockReturnValue(of({}));

    component.onSubmit();

    expect(accountService.register).toHaveBeenCalledWith(expect.objectContaining({
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
    accountService.register.mockReturnValue(throwError(() => 'Server error'));

    component.onSubmit();

    expect(alertService.error).toHaveBeenCalled();
  });

  it('should not call register if form is invalid', () => {
    component.form.controls['firstName'].setValue('');
    component.onSubmit();
    expect(accountService.register).not.toHaveBeenCalled();
  });
});
