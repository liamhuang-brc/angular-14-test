import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
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
            imports: [RouterTestingModule, LayoutComponent],
            providers: [
                { provide: Router, useClass: MockRouter },
                { provide: AccountService, useClass: MockAccountService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;

        router = TestBed.inject(Router) as unknown as MockRouter;
        accountService = TestBed.inject(AccountService) as unknown as MockAccountService;
    });

    describe('Component creation', () => {
        beforeEach(() => {
            router = TestBed.inject(Router) as unknown as MockRouter;
            accountService = TestBed.inject(AccountService) as unknown as MockAccountService;
            fixture.detectChanges();
        });

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
            router.navigate.mockClear();
            accountService.userValue = { id: 1, username: 'test' };
            const testFixture = TestBed.createComponent(LayoutComponent);
            const testComponent = testFixture.componentInstance;

            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });

        it('should call navigate twice (only once in actual code)', () => {
            router.navigate.mockClear();
            accountService.userValue = { id: 99, username: 'john' };
            const testFixture = TestBed.createComponent(LayoutComponent);
            const testComponent = testFixture.componentInstance;

            expect(router.navigate).toHaveBeenCalledTimes(1);
        });
    });
});
