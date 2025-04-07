import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { VisitorGuard } from './visitorGuard';

describe('visitorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => VisitorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
