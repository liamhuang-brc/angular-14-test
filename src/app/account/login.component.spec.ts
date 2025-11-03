import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { AccountService, AlertService } from '../services';

class MockAccountService {
    login = jest.fn();
}

class MockAlertService {
    clear = jest.fn();
    error = jest.fn();
}

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let accountService: MockAccountService;
    let alertService: MockAlertService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [LoginComponent],
            providers: [
                FormBuilder,
                { provide: AccountService, useClass: MockAccountService },
                { provide: AlertService, useClass: MockAlertService },
                {
                    provide: ActivatedRoute,
                    useValue: { snapshot: { queryParams: {} } },
                },
                {
                    provide: Router,
                    useValue: { navigateByUrl: jest.fn() },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;

        accountService = TestBed.inject(AccountService) as unknown as MockAccountService;
        alertService = TestBed.inject(AlertService) as unknown as MockAlertService;
        router = TestBed.inject(Router);

        fixture.detectChanges();
    });

    describe('Initialization', () => {
        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should initialize the form with username and password fields', () => {
            const form = component.form;
            expect(form.contains('username')).toBe(true);
            expect(form.contains('password')).toBe(true);
        });
    });

    describe('Form validation', () => {
        it('should mark the form invalid if username or password is missing', () => {
            component.form.setValue({ username: '', password: '' });
            expect(component.form.invalid).toBe(true);
        });

        it('should mark form valid if both fields are filled', () => {
            component.form.setValue({ username: 'user1', password: 'pass1' });
            expect(component.form.valid).toBe(true);
        });
    });

    describe('onSubmit()', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should stop execution if form is invalid', () => {
            component.form.setValue({ username: '', password: '' });
            component.onSubmit();
            expect(alertService.clear).toHaveBeenCalled();
            expect(accountService.login).not.toHaveBeenCalled();
        });

        it('should call accountService.login when form is valid', () => {
            component.form.setValue({ username: 'test', password: '1234' });
            accountService.login = jest.fn().mockReturnValue(of(true));
            component.onSubmit();
            expect(accountService.login).toHaveBeenCalledWith('test', '1234');
        });

        it('should navigate to / on successful login', () => {
            component.form.setValue({ username: 'test', password: '1234' });
            accountService.login = jest.fn().mockReturnValue(of(true));

            component.onSubmit();

            expect((router as any).navigateByUrl).toHaveBeenCalledWith('/');
        });

        it('should call alertService.error on login failure', () => {
            const mockError = 'Invalid credentials';
            accountService.login = jest.fn().mockReturnValue(throwError(() => mockError));

            component.form.setValue({ username: 'test', password: 'wrong' });
            component.onSubmit();

            expect(alertService.error).toHaveBeenCalledWith(mockError);
            expect(component.loading).toBe(false);
        });

        it('should clear alerts once on submit', () => {
            component.form.setValue({ username: '', password: '' });
            component.onSubmit();
            expect(alertService.clear).toHaveBeenCalledTimes(1);
        });
    });
});
