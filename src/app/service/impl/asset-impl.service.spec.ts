import { TestBed } from '@angular/core/testing';

import { AssetServiceImpl } from './asset-impl.service';

describe('AssetServiceService', () => {
  let service: AssetServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
