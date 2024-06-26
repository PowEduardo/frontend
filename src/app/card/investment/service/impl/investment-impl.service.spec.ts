import { TestBed } from '@angular/core/testing';

import { InvestmentServiceImpl } from './investment-impl.service';

describe('InvestmentImplService', () => {
  let service: InvestmentServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
