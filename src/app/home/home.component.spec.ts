import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { HomeComponent } from './home.component';
import { AccountService } from '../services';
import { User } from '../models';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let accountServiceMock: any;

    const mockUser: User = {
        id: '101',
        username: 'ShashankBharadwaj',
        firstName: 'John',
        lastName: 'Bharadwaj',
        token: 'checkThisT0KenOut&!etMeInHehehe'
    };

    beforeEach(async () => {
        accountServiceMock = {
            userValue: mockUser
        };

        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [HomeComponent],
            providers: [
                { provide: AccountService, useValue: accountServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('Initialization', () => {
        it('should create the component instance', () => {
            expect(component).toBeTruthy();
        });

        it('should assign user from AccountService', () => {
            expect(component.user?.firstName).toEqual('John');
        });

        it('should display user first name in the greeting', () => {
            const heading = fixture.debugElement.query(By.css('h1')).nativeElement;

            expect(heading.textContent.trim()).toBe('Hi John!');
        });
    });

    describe('Template rendering', () => {
        it('should contain a link to manage users', () => {
            const anchor = fixture.debugElement.query(By.css('a')).nativeElement;

            expect(anchor.getAttribute('routerLink')).toBe('/users');
            expect(anchor.textContent).toContain('Manage Users');
        });

        it('should render paragraph content correctly', () => {
            const paragraphs = fixture.debugElement.queryAll(By.css('p'));

            expect(paragraphs.length).toBe(3);

            expect(paragraphs[0].nativeElement.textContent.trim()).toBe("You're logged in with Angular 15!!!");
        });
    });

    describe('Edge behavior', () => {
        it('should handle case when AccountService returns null user', () => {
            accountServiceMock.userValue = null;
            fixture = TestBed.createComponent(HomeComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const heading = fixture.debugElement.query(By.css('h1')).nativeElement;

            expect(heading.textContent).toContain('Hi ');
        });
    });

    describe('Change detection', () => {
        it('should update view if user data changes after initialization', () => {
            accountServiceMock.userValue.firstName = 'Jane';
            fixture.detectChanges();

            const heading = fixture.debugElement.query(By.css('h1')).nativeElement;
            expect(heading.textContent).toContain('Jane');
        });
    });
});
