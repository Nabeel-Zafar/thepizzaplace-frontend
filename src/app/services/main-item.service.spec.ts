import { TestBed } from '@angular/core/testing';

import { MainItemService } from './main-item.service';

describe('MainItemService', () => {
  let service: MainItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
