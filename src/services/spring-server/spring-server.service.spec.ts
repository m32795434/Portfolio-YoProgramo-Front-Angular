import { TestBed } from '@angular/core/testing';

import { SpringServerService } from './spring-server.service';

describe('SpringServerService', () => {
  let service: SpringServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpringServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
