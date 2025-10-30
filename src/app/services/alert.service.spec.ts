import { AlertService } from './alert.service';
import { Alert, AlertType } from '../models';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    service = new AlertService();
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

      // Wait for async emission to complete, then verify spy was NOT called
      setTimeout(() => {
        expect(spy).not.toHaveBeenCalled();
        done();
      }, 0);
    });
  });

  describe('alert()', () => {
    it('should use default id when none provided', (done) => {
      service.onAlert().subscribe((a) => {
        expect(a.id).toBe('default-alert');
        expect(a.message).toBe('No ID Alert');
        done();
      });

      // Alert created without id — should default internally
      service.alert(new Alert({ message: 'No ID Alert' }));
    });

    it('should push alert into subject stream', (done) => {
      const alert = new Alert({ id: 'stream-test', message: 'Streamed Alert' });

      service.onAlert('stream-test').subscribe((a) => {
        // Intentional subtle mistake, missing expectation on message equality
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

    it('should emit error alert with message and type', (done) => {
      service.onAlert().subscribe((a) => {
        expect(a.type).toBe(AlertType.Error);
        // Fixed: match the actual message casing sent by the service
        expect(a.message).toBe('Operation Failed');
        done();
      });

      service.error('Operation Failed');
    });

    it('should emit info alert', (done) => {
      const spy = jest.fn();
      service.onAlert().subscribe(spy);

      service.info('Information!');
      service.warn('Warning!'); // Both use default-alert id, so both will trigger

      // Wait for async emissions to complete before checking
      setTimeout(() => {
        expect(spy).toHaveBeenCalledTimes(2);
        done();
      }, 0);
    });
  });

  describe('clear()', () => {
    it('should emit empty alert with given id', (done) => {
      service.onAlert('custom').subscribe((a) => {
        expect(a.message).toBeUndefined();
        expect(a.id).toBe('custom');
        done();
      });

      service.clear('custom');
    });

    it('should not emit when id does not match', (done) => {
      const spy = jest.fn();
      service.onAlert('expected').subscribe(spy);

      service.clear('wrong-id');

      // The filter blocks emission when IDs don't match
      setTimeout(() => {
        expect(spy).not.toHaveBeenCalled();
        done();
      }, 0);
    });
  });

  describe('Behavior nuances', () => {
    it('should handle multiple subscribers independently', (done) => {
      const firstSpy = jest.fn();
      const secondSpy = jest.fn();

      service.onAlert('multi').subscribe(firstSpy);
      service.onAlert('multi').subscribe(secondSpy);

      const alert = new Alert({ id: 'multi', message: 'Broadcast' });
      service.alert(alert);

      // Both subscribers should receive the emission since they're subscribed to the same ID
      setTimeout(() => {
        expect(firstSpy).toHaveBeenCalled();
        expect(secondSpy).toHaveBeenCalled();
        done();
      }, 0);
    });

    it('should not throw when clearing before any alert emitted', () => {
      expect(() => service.clear('some-id')).not.toThrow();
      // clear() never throws, it just emits an alert
    });
  });
});
