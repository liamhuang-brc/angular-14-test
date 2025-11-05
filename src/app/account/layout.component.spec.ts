import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AccountService } from '../services';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

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
            imports: [CommonModule, RouterOutlet],
            providers: [
                { provide: Router, useClass: MockRouter },
                { provide: AccountService, useClass: MockAccountService },
            ],
            schemas: [NO_ERRORS_SCHEMA]
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

        it('should not redirect when userValue is null by default', () => {
            expect(router.navigate).not.toHaveBeenCalled();
        });
    });

    describe('Redirection logic', () => {
        it('should NOT navigate if userValue is null', () => {
            jest.clearAllMocks();
            accountService.userValue = null;
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;

            expect(router.navigate).not.toHaveBeenCalled();
        });

        it('should navigate to home if userValue exists', () => {
            jest.clearAllMocks();
            accountService.userValue = { id: 1, username: 'admin' };
            fixture = TestBed.createComponent(LayoutComponent);
            component = fixture.componentInstance;

            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });

    });
});
