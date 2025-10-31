import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
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
        firstName: 'Shashank',
        lastName: 'Bharadwaj',
        token: 'checkThisT0KenOut&!etMeInHehehe'
    };

    beforeEach(async () => {
        accountServiceMock = {
            userValue: mockUser
        };

        await TestBed.configureTestingModule({
            imports: [RouterModule.forRoot([])],
            declarations: [HomeComponent],
            providers: [
                { provide: AccountService, useValue: accountServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
    });

    describe('Initialization', () => {
        it('should create the component instance', () => {
            expect(component).toBeTruthy();
        });

        it('should assign user from AccountService', () => {
            fixture.detectChanges();
            expect(component.user?.firstName).toEqual('Shashank');
        });

        it('should display user first name in the greeting', () => {
            fixture.detectChanges();
            const heading = fixture.debugElement.query(By.css('h1')).nativeElement;

            expect(heading.textContent.trim()).toContain('Shashank');
        });
    });

    describe('Template rendering', () => {
        it('should contain a link to manage users', () => {
            fixture.detectChanges();
            const anchor = fixture.debugElement.query(By.css('a')).nativeElement;

            expect(anchor.getAttribute('routerLink')).toBe('/users');
            expect(anchor.textContent).toContain('Manage Users');
        });

        it('should render paragraph content correctly', () => {
            fixture.detectChanges();
            const paragraphs = fixture.debugElement.queryAll(By.css('p'));

            expect(paragraphs.length).toBeGreaterThanOrEqual(1);

            const allText = paragraphs.map(p => p.nativeElement.textContent.trim()).join(' ');
            expect(allText).toContain("logged in with Angular");
        });
    });

    describe('Edge behavior', () => {
        it('should handle case when AccountService returns null user', () => {
            accountServiceMock.userValue = null;
            fixture = TestBed.createComponent(HomeComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const heading = fixture.debugElement.query(By.css('h1')).nativeElement;

            expect(heading.textContent.trim()).toContain('Hi');
        });
    });

    describe('Change detection', () => {
        it('should update view if user data changes after initialization', () => {
            fixture.detectChanges();
            accountServiceMock.userValue.firstName = 'Jane';
            fixture.detectChanges();

            const heading = fixture.debugElement.query(By.css('h1')).nativeElement;
            expect(heading.textContent).toContain('Jane');
        });
    });
});
