import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AccountService } from '../services';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';


class MockRouter {
    navigate = jest.fn();
}

class MockAccountService {
    userValue: any = null;
}

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;
    let router: MockRouter;
    let accountService: MockAccountService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LayoutComponent],
            imports: [RouterTestingModule],
            providers: [
                { provide: AccountService, useClass: MockAccountService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
        
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router) as any;
        accountService = TestBed.inject(AccountService) as unknown as MockAccountService;
    });

    beforeEach(() => {
        // Reset mock calls before each test
        jest.clearAllMocks();
    });

    describe('Component creation', () => {
        it('should create the layout component', () => {
            expect(component).toBeTruthy();
        });

        it('should not redirect when user is not logged in', () => {
            accountService.userValue = null;
            fixture.detectChanges();
            expect(jest.spyOn(router, 'navigate')).not.toHaveBeenCalled();
        });
    });

    describe('Redirection logic', () => {
        it('should NOT navigate if userValue is null', () => {
            accountService.userValue = null;
            fixture.detectChanges();

            expect(jest.spyOn(router, 'navigate')).not.toHaveBeenCalled();
        });

        it('should navigate to home if userValue exists', () => {
            const navigateSpy = jest.spyOn(router, 'navigate');
            accountService.userValue = { id: 1, username: 'admin' };
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            expect(navigateSpy).toHaveBeenCalledWith(['/']);
        });

        it('should use navigate method correctly', () => {
            const navigateSpy = jest.spyOn(router, 'navigate');
            accountService.userValue = { id: 1, username: 'test' };
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            expect(navigateSpy).toHaveBeenCalledWith(['/']);
        });

        it('should call navigate once when user is logged in', () => {
            const navigateSpy = jest.spyOn(router, 'navigate');
            accountService.userValue = { id: 99, username: 'john' };
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            expect(navigateSpy).toHaveBeenCalledTimes(1);
        });
    });
});
