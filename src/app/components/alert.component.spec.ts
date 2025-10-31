import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, NavigationStart } from '@angular/router';
import { of, Subject } from 'rxjs';

import { AlertComponent } from './alert.component';
import { AlertService } from '../services';
import { Alert, AlertType } from '../models';

describe('AlertComponent', () => {
    let component: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;
    let alertServiceMock: any;
    let routerMock: any;
    let routerEvents$: Subject<any>;

    beforeEach(async () => {
        routerEvents$ = new Subject();

        alertServiceMock = {
            onAlert: jest.fn(),
            clear: jest.fn(),
        };

        routerMock = {
            events: routerEvents$.asObservable(),
            navigate: jest.fn()
        };

        await TestBed.configureTestingModule({
            declarations: [AlertComponent],
            providers: [
                { provide: AlertService, useValue: alertServiceMock },
                { provide: Router, useValue: routerMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AlertComponent);
        component = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
        it('should subscribe to alerts and add them to the alerts array', () => {
            const alert = { message: 'Test alert', type: AlertType.Success };
            const alertSubject = new Subject<Alert>();
            alertServiceMock.onAlert.mockReturnValue(alertSubject.asObservable());

            component.ngOnInit();
            alertSubject.next(alert);

            expect(component.alerts.length).toBe(1);
            expect(component.alerts[0].message).toEqual('Test alert');
        });

        it('should clear alerts on navigation', () => {
            alertServiceMock.onAlert.mockReturnValue(of());
            component.ngOnInit();

            routerEvents$.next(new NavigationStart(1, '/home'));
            expect(alertServiceMock.clear).toHaveBeenCalledWith('default-alert');
        });
    });

    describe('removeAlert', () => {
        it('should remove the alert immediately if fade is false', () => {
            const alert: Alert = { message: 'Remove me', type: AlertType.Warning };
            component.alerts = [alert];
            component.fade = false;

            component.removeAlert(alert);

            expect(component.alerts.length).toBe(0);
        });

        it('should fade out and remove alert after timeout if fade is true', fakeAsync(() => {
            const alert: Alert = { message: 'Fade out', type: AlertType.Info };
            component.alerts = [alert];
            component.fade = true;

            component.removeAlert(alert);
            expect(alert.fade).toBe(true);
            tick(250);

            expect(component.alerts.length).toBe(0);
        }));
    });

    describe('cssClass', () => {
        it('should return correct classes for success alert', () => {
            const alert: Alert = { message: 'Done', type: AlertType.Success };
            const css = component.cssClass(alert);

            expect(css).toContain('alert-success');
            expect(css).toContain('alert');
        });

        it('should not break when alert is undefined', () => {
            const css = component.cssClass(undefined as any);
            expect(css).toBeUndefined();
        });
    });

    describe('ngOnDestroy', () => {
        it('should unsubscribe from alert and route subscriptions', () => {
            alertServiceMock.onAlert.mockReturnValue(of({ message: 'x' }));
            component.ngOnInit();

            const alertUnsubSpy = jest.spyOn(component.alertSubscription, 'unsubscribe');
            const routeUnsubSpy = jest.spyOn(component.routeSubscription, 'unsubscribe');

            component.ngOnDestroy();

            expect(alertUnsubSpy).toHaveBeenCalled();
            expect(routeUnsubSpy).toHaveBeenCalled();
        });
    });
});
