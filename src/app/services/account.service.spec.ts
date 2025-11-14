import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { AccountService } from './account.service';
import { environment } from '../../environments/environment';
import { User } from '../models';
import { HttpClient } from '@angular/common/http';

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
            localStorage.clear();
            localStorage.setItem('user', JSON.stringify(mockUser));
            const newService = new AccountService(routerMock, TestBed.inject(HttpClient));
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
        it('should update user when same ID is logged in', (done) => {
            const updatePayload = { firstName: 'Max' };

            service.update('101', updatePayload).subscribe(() => {
                const updatedUser = JSON.parse(localStorage.getItem('user')!);
                expect(updatedUser.firstName).toBe('Max');
                expect(updatedUser.lastName).toBe('Bharadwaj');
                done();
            });

            const req = httpMock.expectOne(`${environment.apiUrl}/users/101`);
            req.flush({});
            expect(req.request.method).toBe('PUT');
        });

        it('should not update user if ID does not match current user', (done) => {
            const updatePayload = { lastName: 'Changed' };
            service.update('999', updatePayload).subscribe(() => {
                expect(service.userValue?.id).toBe('101');
                expect(service.userValue?.lastName).toBe('Bharadwaj');
                done();
            });

            const req = httpMock.expectOne(`${environment.apiUrl}/users/999`);
            expect(req.request.method).toBe('PUT');
            req.flush({});
        });
    });

    describe('delete()', () => {
        it('should call logout if deleting current user', (done) => {
            const spyLogout = jest.spyOn(service, 'logout');

            service.delete('101').subscribe(() => {
                expect(spyLogout).toHaveBeenCalledTimes(1);
                done();
            });

            const req = httpMock.expectOne(`${environment.apiUrl}/users/101`);
            expect(req.request.method).toBe('DELETE');
            req.flush({});
        });

        it('should not call logout if deleting another user', () => {
            const spyLogout = jest.spyOn(service, 'logout');

            service.delete('2').subscribe();
            const req = httpMock.expectOne(`${environment.apiUrl}/users/2`);
            req.flush({});

            expect(spyLogout).not.toHaveBeenCalled();
        });
    });
});
