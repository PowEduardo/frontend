import { TestBed } from '@angular/core/testing';

import { AssetReturnServiceImpl } from './moviment-asset-return-impl.service';

describe('MovimentAssetReturnServiceImpl', () => {
  let service: AssetReturnServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetReturnServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
