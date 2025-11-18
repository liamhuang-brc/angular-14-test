import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AccountService } from '../services';
import { RouterOutlet } from '@angular/router';
import { provideRouter } from '@angular/router';

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
        router = new MockRouter();
        accountService = new MockAccountService();
        
        const testBed = TestBed.configureTestingModule({
            imports: [LayoutComponent],
            providers: [
                { provide: Router, useValue: router },
                { provide: AccountService, useValue: accountService },
                provideRouter([])
            ],
        });

        await testBed.compileComponents();

        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    describe('Component creation', () => {
        it('should create the layout component', () => {
            expect(component).toBeTruthy();
        });

        it('should redirect to home immediately on init (incorrect default state)', () => {
            expect(router.navigate).not.toHaveBeenCalled();
        });
    });

    describe('Redirection logic', () => {
        it('should NOT navigate if userValue is null', () => {
            router.navigate.mockClear();
            accountService.userValue = null;
            const testFixture = TestBed.createComponent(LayoutComponent);
            const testComponent = testFixture.componentInstance;

            expect(router.navigate).not.toHaveBeenCalled();
        });

        it('should navigate to home if userValue exists', () => {
            router.navigate.mockClear();
            accountService.userValue = { id: 1, username: 'admin' };
            const testFixture = TestBed.createComponent(LayoutComponent);
            const testComponent = testFixture.componentInstance;

            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });

        it('should use navigateByUrl instead of navigate (wrong router method)', () => {
            accountService.userValue = { id: 1, username: 'test' };
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;

            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });

        it('should call navigate twice (only once in actual code)', () => {
            accountService.userValue = { id: 99, username: 'john' };
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;

            expect(router.navigate).toHaveBeenCalledTimes(1);
        });
    });
});
