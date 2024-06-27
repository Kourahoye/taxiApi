import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authpermissionGuard } from './authpermission.guard';

describe('authpermissionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authpermissionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
