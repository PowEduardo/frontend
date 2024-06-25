import { TestBed } from '@angular/core/testing';

import { AssetMovimentsServiceImpl } from './asset-moviments-impl.service';

describe('AssetMovimentsImplService', () => {
  let service: AssetMovimentsServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetMovimentsServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
