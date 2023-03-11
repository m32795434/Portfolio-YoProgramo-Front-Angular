import { TestBed } from '@angular/core/testing';

import { JsonServerRequestsService } from './json-server-requests-service';

describe('JsonServerRequestsServiceService', () => {
  let service: JsonServerRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonServerRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
