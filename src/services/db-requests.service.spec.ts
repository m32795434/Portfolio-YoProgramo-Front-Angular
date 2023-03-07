import { TestBed } from '@angular/core/testing';

import { DbRequestsService } from './db-requests.service';

describe('DbRequestsService', () => {
  let service: DbRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
