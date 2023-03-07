import { TestBed } from '@angular/core/testing';

import { LSRequestsService } from './lsrequests.service';

describe('LSRequestsService', () => {
  let service: LSRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LSRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
