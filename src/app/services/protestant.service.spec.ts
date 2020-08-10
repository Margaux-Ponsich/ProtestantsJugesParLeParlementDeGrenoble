import { TestBed } from '@angular/core/testing';

import { ProtestantService } from './protestant.service';

describe('ProtestantService', () => {
  let service: ProtestantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtestantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
