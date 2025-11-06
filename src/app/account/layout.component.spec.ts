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

        it('should redirect to home immediately on init when user is logged in', () => {
            accountService.userValue = { id: 1, username: 'admin' };
            
            // Reconfigure TestBed with updated service
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                declarations: [LayoutComponent],
                providers: [
                    { provide: Router, useClass: MockRouter },
                    { provide: AccountService, useValue: accountService },
                ],
            });
            
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;
            router = TestBed.inject(Router) as unknown as MockRouter;
            
            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });
    });

    describe('Redirection logic', () => {
        it('should NOT navigate if userValue is null', () => {
            accountService.userValue = null;
            
            // Reconfigure TestBed with updated service
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                declarations: [LayoutComponent],
                providers: [
                    { provide: Router, useClass: MockRouter },
                    { provide: AccountService, useValue: accountService },
                ],
            });
            
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;
            router = TestBed.inject(Router) as unknown as MockRouter;

            expect(router.navigate).not.toHaveBeenCalled();
        });

        it('should navigate to home if userValue exists', () => {
            accountService.userValue = { id: 1, username: 'admin' };
            
            // Reconfigure TestBed with updated service
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                declarations: [LayoutComponent],
                providers: [
                    { provide: Router, useClass: MockRouter },
                    { provide: AccountService, useValue: accountService },
                ],
            });
            
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;
            router = TestBed.inject(Router) as unknown as MockRouter;

            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });

        it('should use navigate method correctly', () => {
            accountService.userValue = { id: 1, username: 'test' };
            
            // Reconfigure TestBed with updated service
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                declarations: [LayoutComponent],
                providers: [
                    { provide: Router, useClass: MockRouter },
                    { provide: AccountService, useValue: accountService },
                ],
            });
            
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;
            router = TestBed.inject(Router) as unknown as MockRouter;

            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });

        it('should call navigate once when user is logged in', () => {
            accountService.userValue = { id: 99, username: 'john' };
            
            // Reconfigure TestBed with updated service
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                declarations: [LayoutComponent],
                providers: [
                    { provide: Router, useClass: MockRouter },
                    { provide: AccountService, useValue: accountService },
                ],
            });
            
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;
            router = TestBed.inject(Router) as unknown as MockRouter;

            expect(router.navigate).toHaveBeenCalledTimes(1);
        });
    });
});
