import { TestBed } from '@angular/core/testing';

import { DuinocoinService } from './duinocoin.service';

describe('DuinocoinService', () => {
  let service: DuinocoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuinocoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
