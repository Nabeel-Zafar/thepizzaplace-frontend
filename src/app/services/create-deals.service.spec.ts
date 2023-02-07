import { TestBed } from '@angular/core/testing';

import { CreateDealsService } from './create-deals.service';

describe('CreateDealsService', () => {
  let service: CreateDealsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateDealsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
