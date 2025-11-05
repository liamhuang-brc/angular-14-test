import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { AccountService } from './account.service';
import { environment } from '../../environments/environment';
import { User } from '../models';

describe('AccountService', () => {
    let service: AccountService;
    let httpMock: HttpTestingController;
    let routerMock: any;

    const mockUser: User = {
        id: '101',
        username: 'ShashankBharadwaj',
        firstName: 'Shashank',
        lastName: 'Bharadwaj',
        token: 'checkThisT0KenOut&!etMeInHehehe'
    };

    beforeEach(() => {
        routerMock = { navigate: jest.fn() };

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AccountService,
                { provide: Router, useValue: routerMock }
            ]
        });

        service = TestBed.inject(AccountService);
        httpMock = TestBed.inject(HttpTestingController);

        localStorage.setItem('user', JSON.stringify(mockUser));
    });

    afterEach(() => {
        httpMock.verify();
        localStorage.clear();
    });

    describe('Initialization', () => {
        it('should initialize with user from localStorage', () => {
            // Create a new service instance to test initialization
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [
                    AccountService,
                    { provide: Router, useValue: routerMock }
                ]
            });
            const newService = TestBed.inject(AccountService);
            const currentUser = newService.userValue;
            expect(currentUser?.username).toBe('ShashankBharadwaj');
        });
    });

    describe('login()', () => {
        it('should store user and emit new user value after successful login', () => {
            const loginResponse = { ...mockUser, token: 'new-token' };

            service.login('ShashankBharadwaj', 'password123').subscribe(user => {
                expect(user.token).toBe('new-token');
            });

            const req = httpMock.expectOne(`${environment.apiUrl}/users/authenticate`);
            expect(req.request.method).toBe('POST');
            req.flush(loginResponse);

            const stored = JSON.parse(localStorage.getItem('user') || '{}');
            expect(stored.token).toBe('new-token');
            expect(service.userValue?.token).toBe('new-token');
        });

        it('should call API with username and password', () => {
            service.login('ShashankBharadwaj', 'password123').subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/authenticate`);

            expect(req.request.body.username).toBe('ShashankBharadwaj');
        });
    });

    describe('logout()', () => {
        it('should clear user from localStorage and navigate to login', () => {
            service.logout();

            expect(service.userValue).toBeNull();

            expect(localStorage.getItem('user')).toBeNull();
            expect(routerMock.navigate).toHaveBeenCalledWith(['/account/login']);
        });
    });

    describe('register()', () => {
        it('should call POST /users/register API', () => {
            const newUser: User = { id: '2', username: 'liam', firstName: 'Liam', lastName: 'Huang', token: '' };

            service.register(newUser).subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/register`);

            expect(req.request.method).toBe('POST');
        });
    });

    describe('update()', () => {
        it('should update user when same ID is logged in', () => {
            // Set up a user with ID '1' to match the update call
            const userWithId1 = { ...mockUser, id: '1' };
            localStorage.setItem('user', JSON.stringify(userWithId1));
            // Reinitialize service to pick up the new user
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [
                    AccountService,
                    { provide: Router, useValue: routerMock }
                ]
            });
            service = TestBed.inject(AccountService);
            httpMock = TestBed.inject(HttpTestingController);
            
            const updatePayload = { firstName: 'Max' };

            service.update('1', updatePayload).subscribe();

            const req = httpMock.expectOne(`${environment.apiUrl}/users/1`);
            expect(req.request.method).toBe('PUT');
            req.flush({});

            const updatedUser = JSON.parse(localStorage.getItem('user')!);

            expect(updatedUser.firstName).toBe('Max');
        });

        it('should not update user if ID does not match current user', () => {
            // Ensure the service has the correct user loaded
            const currentUser = service.userValue;
            expect(currentUser?.id).toBe('101'); // Verify initial state
            
            const updatePayload = { lastName: 'Changed' };
            service.update('999', updatePayload).subscribe();

            const req = httpMock.expectOne(`${environment.apiUrl}/users/999`);
            req.flush({});

            // User should remain unchanged since we updated a different user
            expect(service.userValue?.id).toBe('101');
            expect(service.userValue?.lastName).toBe('Bharadwaj'); // Original lastName should be unchanged
        });
    });

    describe('delete()', () => {
        it('should call logout if deleting current user', () => {
            const spyLogout = jest.spyOn(service, 'logout').mockImplementation(() => {});

            service.delete('101').subscribe({
                next: () => {
                    // Ensure the observable completes before checking the spy
                    expect(spyLogout).toHaveBeenCalledTimes(1);
                }
            });
            
            const req = httpMock.expectOne(`${environment.apiUrl}/users/101`);
            req.flush({});
        });

        it('should not call logout if deleting another user', () => {
            const spyLogout = jest.spyOn(service, 'logout').mockImplementation(() => {});

            service.delete('2').subscribe({
                next: () => {
                    // Ensure the observable completes before checking the spy
                    expect(spyLogout).not.toHaveBeenCalled();
                }
            });
            
            const req = httpMock.expectOne(`${environment.apiUrl}/users/2`);
            req.flush({});
        });
    });
});
