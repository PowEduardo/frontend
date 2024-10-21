import { TestBed } from '@angular/core/testing';

import { AssetReturnServiceImpl } from './movement-asset-return-impl.service';

describe('MovementAssetReturnServiceImpl', () => {
  let service: AssetReturnServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetReturnServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
