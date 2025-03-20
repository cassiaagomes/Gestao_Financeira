import { TestBed } from '@angular/core/testing';

import { TransactionFireService } from './transaction-fire.service';

describe('TransactionFireService', () => {
  let service: TransactionFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
