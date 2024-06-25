import { TestBed } from '@angular/core/testing';

import { MovimentAssetReturnServiceImpl } from './moviment-asset-return-impl.service';

describe('MovimentAssetReturnServiceImpl', () => {
  let service: MovimentAssetReturnServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimentAssetReturnServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
