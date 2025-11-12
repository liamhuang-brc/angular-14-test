import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditComponent } from './add-edit.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AccountService, AlertService } from '../services';

describe('AddEditComponent', () => {
  let component: AddEditComponent;
  let fixture: ComponentFixture<AddEditComponent>;
  let mockAccountService: any;
  let mockAlertService: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockAccountService = {
      register: jest.fn().mockReturnValue(of({})),
      update: jest.fn().mockReturnValue(of({})),
      getById: jest.fn().mockReturnValue(of({ firstName: 'John', lastName: 'Doe', username: 'jdoe' }))
    };

    mockAlertService = {
      success: jest.fn(),
      error: jest.fn(),
      clear: jest.fn()
    };

    mockRouter = { navigateByUrl: jest.fn() };
    mockActivatedRoute = { snapshot: { params: {} } };

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

    fixture = TestBed.createComponent(AddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initialization', () => {
    it('should create the component instance', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize form with empty fields in add mode', () => {
      const controls = component.form.controls;
      expect(controls['firstName'].value).toBe('');
      expect(controls['password'].validator).toBeTruthy();
    });

    it('should switch to edit mode when id is present', () => {
      mockActivatedRoute.snapshot.params = { id: '1' };
      component.ngOnInit();

      expect(component.title).toBe('Edit User');
      expect(component.loading).toBe(false);
    });

    it('should patch form values in edit mode', () => {
      mockActivatedRoute.snapshot.params = { id: '1' };
      component.ngOnInit();

      expect(component.form.value.firstName).toEqual('John');
    });
  });

  describe('Form validation', () => {
    it('should mark form invalid when required fields are empty', () => {
      component.form.setValue({ firstName: '', lastName: '', username: '', password: '' });
      expect(component.form.invalid).toBeTruthy(); 
    });

    it('should enforce password minlength rule', () => {
      const passwordControl = component.form.get('password');
      passwordControl?.setValue('123');
      expect(passwordControl?.valid).toBe(false); 
    });

    it('should not require password in edit mode', () => {
      mockActivatedRoute.snapshot.params = { id: '99' };
      component.ngOnInit();
      const passwordControl = component.form.get('password');
      expect(passwordControl?.hasError('required')).toBeFalsy(); 
    });
  });

  describe('onSubmit()', () => {
    it('should not submit when form is invalid', () => {
      const spy = jest.spyOn(mockAccountService, 'register');
      component.form.controls['firstName'].setValue('');
      component.onSubmit();
      expect(spy).not.toHaveBeenCalled(); 
    });

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

    it('should call accountService.update in edit mode', () => {
      mockActivatedRoute.snapshot.params = { id: '42' };
      component.ngOnInit();

      component.form.patchValue({ firstName: 'Edited', lastName: 'User', username: 'edituser', password: '' });
      component.onSubmit();

      expect(mockAccountService.update).toHaveBeenCalledWith(
        '42',
        expect.objectContaining({ username: 'edituser' })
      );
    });

    it('should navigate after successful save', () => {
      component.form.patchValue({
        firstName: 'New',
        lastName: 'User',
        username: 'newuser',
        password: 'password'
      });

      component.onSubmit();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/users');
    });

    it('should show alert on API error', () => {
      jest.spyOn(mockAccountService, 'register').mockReturnValue(throwError(() => 'Error!'));

      component.form.patchValue({
        firstName: 'Bad',
        lastName: 'Data',
        username: 'baddata',
        password: 'short'
      });

      component.onSubmit();
      expect(mockAlertService.error).toHaveBeenCalled(); 
    });
  });
});
