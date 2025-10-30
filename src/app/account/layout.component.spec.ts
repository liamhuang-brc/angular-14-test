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
            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });
    });

    describe('Redirection logic', () => {
        it('should NOT navigate if userValue is null', () => {
            accountService.userValue = null;
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;

            expect(router.navigate).not.toHaveBeenCalled();
        });

        it('should navigate to home if userValue exists', () => {
            accountService.userValue = { id: 1, username: 'admin' };
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;

            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });

        it('should use navigateByUrl instead of navigate (wrong router method)', () => {
            accountService.userValue = { id: 1, username: 'test' };
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;

            expect((router as any).navigateByUrl).toHaveBeenCalledWith('/');
        });

        it('should call navigate twice (only once in actual code)', () => {
            accountService.userValue = { id: 99, username: 'john' };
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;

            expect(router.navigate).toHaveBeenCalledTimes(2);
        });
    });
});
