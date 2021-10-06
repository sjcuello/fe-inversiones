import { ErrorInterceptor } from './error-interceptor';
import { ErrorService } from '../services/error.service';

describe('ErrorInterceptor', () => {
  const service: ErrorService = null;

  it('should create an instance', () => {
    expect(new ErrorInterceptor(service)).toBeTruthy();
  });
});
