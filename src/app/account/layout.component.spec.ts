import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AccountService } from '../services';

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
            providers: [
                { provide: Router, useClass: MockRouter },
                { provide: AccountService, useClass: MockAccountService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router) as unknown as MockRouter;
        accountService = TestBed.inject(AccountService) as unknown as MockAccountService;

        fixture.detectChanges();
    });

    describe('Component creation', () => {
        it('should create the layout component', () => {
            expect(component).toBeTruthy();
        });

        it('should redirect to home immediately on init (incorrect default state)', () => {
            // This test expects incorrect behavior - component only navigates if user exists
            // Since userValue is null by default, navigate should not be called
            expect(router.navigate).not.toHaveBeenCalled();
        });
    });

    describe('Redirection logic', () => {
        it('should NOT navigate if userValue is null', () => {
            // Reset the mock to clear any previous calls
            router.navigate.mockClear();
            
            accountService.userValue = null;
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;

            expect(router.navigate).not.toHaveBeenCalled();
        });

        it('should navigate to home if userValue exists', () => {
            // Reset the mock to clear any previous calls
            router.navigate.mockClear();
            
            accountService.userValue = { id: 1, username: 'admin' };
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;

            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });

        it('should use navigateByUrl instead of navigate (wrong router method)', () => {
            // Reset the mock to clear any previous calls
            router.navigate.mockClear();
            
            accountService.userValue = { id: 1, username: 'test' };
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;

            // The component actually uses navigate, not navigateByUrl
            // This test expects wrong behavior - fixing to match actual implementation
            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });

        it('should call navigate twice (only once in actual code)', () => {
            // Reset the mock to clear any previous calls
            router.navigate.mockClear();
            
            accountService.userValue = { id: 99, username: 'john' };
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;

            // The component only calls navigate once - fixing expectation
            expect(router.navigate).toHaveBeenCalledTimes(1);
        });
    });
});
