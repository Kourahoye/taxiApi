import { TestBed } from '@angular/core/testing';

import { UsernameHandleService } from './username-handle.service';

describe('UsernameHandleService', () => {
  let service: UsernameHandleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsernameHandleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
