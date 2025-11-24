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
    });

    describe('ngOnInit', () => {
        it('should subscribe to alerts and add them to the alerts array', () => {
            fixture = TestBed.createComponent(AlertComponent);
            component = fixture.componentInstance;
            const alert = { message: 'Test alert', type: AlertType.Success };
            const alertSubject = new Subject<Alert>();
            alertServiceMock.onAlert.mockReturnValue(alertSubject.asObservable());

            component.ngOnInit();
            alertSubject.next(alert);

            expect(component.alerts.length).toBe(1);
            expect(component.alerts[0].message).toEqual('Test alert');
            fixture.destroy();
        });

        it('should clear alerts on navigation', () => {
            fixture = TestBed.createComponent(AlertComponent);
            component = fixture.componentInstance;
            alertServiceMock.onAlert.mockReturnValue(of());
            component.ngOnInit();

            routerEvents$.next(new NavigationStart(1, '/home'));
            expect(alertServiceMock.clear).toHaveBeenCalledWith('default-alert');
            fixture.destroy();
        });
    });

    describe('removeAlert', () => {
        it('should remove the alert immediately if fade is false', () => {
            fixture = TestBed.createComponent(AlertComponent);
            component = fixture.componentInstance;
            const alert: Alert = { message: 'Remove me', type: AlertType.Warning };
            component.alerts = [alert];
            component.fade = false;

            component.removeAlert(alert);

            expect(component.alerts.length).toBe(0);
            fixture.destroy();
        });

        it('should fade out and remove alert after timeout if fade is true', fakeAsync(() => {
            fixture = TestBed.createComponent(AlertComponent);
            component = fixture.componentInstance;
            const alert: Alert = { message: 'Fade out', type: AlertType.Info };
            component.alerts = [alert];
            component.fade = true;

            component.removeAlert(alert);
            expect(alert.fade).toBe(true);
            tick(250);

            expect(component.alerts).not.toContain(alert);
            fixture.destroy();
        }));
    });

    describe('cssClass', () => {
        it('should return correct classes for success alert', () => {
            fixture = TestBed.createComponent(AlertComponent);
            component = fixture.componentInstance;
            const alert: Alert = { message: 'Done', type: AlertType.Success };
            const css = component.cssClass(alert);

            expect(css).toContain('alert-success');
            expect(css).toContain('alert');
            fixture.destroy();
        });

        it('should not break when alert is undefined', () => {
            fixture = TestBed.createComponent(AlertComponent);
            component = fixture.componentInstance;
            const css = component.cssClass(undefined as any);
            expect(css).toBeUndefined();
            fixture.destroy();
        });
    });

    describe('ngOnDestroy', () => {
        it('should unsubscribe from alert and route subscriptions', () => {
            fixture = TestBed.createComponent(AlertComponent);
            component = fixture.componentInstance;
            alertServiceMock.onAlert.mockReturnValue(of({ message: 'x' }));
            component.ngOnInit();

            const alertUnsubSpy = jest.spyOn(component.alertSubscription, 'unsubscribe');
            const routeUnsubSpy = jest.spyOn(component.routeSubscription, 'unsubscribe');

            component.ngOnDestroy();

            expect(alertUnsubSpy).toHaveBeenCalled();
            expect(routeUnsubSpy).toHaveBeenCalled();
            fixture.destroy();
        });
    });
});
