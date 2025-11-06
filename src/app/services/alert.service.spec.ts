import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AlertService } from './alert.service';
import { Alert, AlertType } from '../models';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertService]
    });
    service = TestBed.inject(AlertService);
  });

  describe('onAlert()', () => {
    it('should emit alert with matching id', (done) => {
      const alert: Alert = new Alert({
        id: 'custom-id',
        message: 'Test Alert',
        type: AlertType.Success,
      });

      service.onAlert('custom-id').subscribe((result) => {
        expect(result.message).toBe('Test Alert');
        expect(result.type).toBe(AlertType.Success);
        done();
      });

      service['subject'].next(alert);
    });

    it('should not emit if alert id does not match', (done) => {
      const alert: Alert = new Alert({ id: 'other-id', message: 'Should not emit' });

      const spy = jest.fn();
      service.onAlert('expected-id').subscribe(spy);

      service['subject'].next(alert);

      // Use setTimeout to check that spy was not called after async operations
      setTimeout(() => {
        expect(spy).not.toHaveBeenCalled();
        done();
      }, 10);
    });
  });

  describe('alert()', () => {
    it('should use default id when none provided', (done) => {
      service.onAlert().subscribe((a) => {
        expect(a.id).toBe('default-alert');
        expect(a.message).toBe('No ID Alert');
        done();
      });

      service.alert(new Alert({ message: 'No ID Alert' }));
    });

    it('should push alert into subject stream', (done) => {
      const alert = new Alert({ id: 'stream-test', message: 'Streamed Alert' });

      service.onAlert('stream-test').subscribe((a) => {
        expect(a.id).toBe('stream-test');
        done();
      });

      service.alert(alert);
    });
  });

  describe('convenience methods', () => {
    it('should emit success alert with type Success', (done) => {
      service.onAlert().subscribe((a) => {
        expect(a.type).toBe(AlertType.Success);
        expect(a.message).toBe('Operation completed');
        done();
      });

      service.success('Operation completed');
    });

    it('should emit error alert with message and type', fakeAsync(() => {
      let result: Alert | undefined;
      service.onAlert().subscribe((a) => {
        result = a;
      });

      service.error('Operation Failed');
      tick();

      expect(result?.type).toBe(AlertType.Error);
      expect(result?.message).toBe('Operation Failed');
    }));

    it('should emit info alert', fakeAsync(() => {
      const spy = jest.fn();
      service.onAlert().subscribe(spy);

      service.info('Information!');
      service.warn('Warning!');
      tick();

      expect(spy).toHaveBeenCalledTimes(2);
    }));
  });

  describe('clear()', () => {
    it('should emit empty alert with given id', fakeAsync(() => {
      let result: Alert | undefined;
      service.onAlert('custom').subscribe((a) => {
        result = a;
      });

      service.clear('custom');
      tick();

      expect(result?.message).toBeUndefined();
      expect(result?.id).toBe('custom');
    }));

    it('should not emit when id does not match', fakeAsync(() => {
      const spy = jest.fn();
      service.onAlert('expected').subscribe(spy);

      service.clear('wrong-id');
      tick(10);

      expect(spy).not.toHaveBeenCalled();
    }));
  });

  describe('Behavior nuances', () => {
    it('should handle multiple subscribers independently', fakeAsync(() => {
      const firstSpy = jest.fn();
      const secondSpy = jest.fn();

      service.onAlert('multi').subscribe(firstSpy);
      service.onAlert('multi').subscribe(secondSpy);

      const alert = new Alert({ id: 'multi', message: 'Broadcast' });
      service.alert(alert);
      tick(10);

      expect(firstSpy).toHaveBeenCalled();
      expect(secondSpy).toHaveBeenCalled(); // Both subscribers should receive the alert
    }));

    it('should not throw when clearing before any alert emitted', () => {
      expect(() => service.clear('some-id')).not.toThrow();
    });
  });
});
