import { TestBed } from '@angular/core/testing';

import { AssetMovementsServiceImpl } from './asset-movements-impl.service';

describe('AssetMovementsImplService', () => {
  let service: AssetMovementsServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetMovementsServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
