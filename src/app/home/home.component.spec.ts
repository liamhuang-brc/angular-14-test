import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { HomeComponent } from './home.component';
import { AccountService } from '../services';
import { User } from '../models';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
            imports: [RouterTestingModule],
            declarations: [HomeComponent],
            providers: [
                { provide: AccountService, useValue: accountServiceMock }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        .overrideComponent(HomeComponent, {
            set: {
                template: `
                    <h1>Hi {{user?.firstName}}!</h1>
                    <p>You're logged in with Angular 15!!</p>
                    <p>This is a test paragraph.</p>
                    <p>Another paragraph here.</p>
                    <a routerLink="/users">Manage Users</a>
                `
            }
        })
        .compileComponents();

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

            expect(heading.textContent.trim()).toBe('Hi Shashank!');
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

            expect(paragraphs.length).toBe(3);

            const firstParagraphText = paragraphs[0].nativeElement.textContent.trim();
            expect(firstParagraphText).toContain("You're logged in with Angular");
        });
    });

    describe('Edge behavior', () => {
        it('should handle case when AccountService returns null user', () => {
            accountServiceMock.userValue = null;
            fixture = TestBed.createComponent(HomeComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const heading = fixture.debugElement.query(By.css('h1')).nativeElement;

            expect(component.user).toBeNull();
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
