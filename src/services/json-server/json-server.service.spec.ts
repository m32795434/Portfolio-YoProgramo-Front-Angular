import { TestBed } from '@angular/core/testing';

import { JsonServerService } from './json-server.service';

describe('JsonServerServiceService', () => {
  let service: JsonServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
