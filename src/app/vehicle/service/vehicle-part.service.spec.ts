import { TestBed } from '@angular/core/testing';

import { VehiclePartService } from './vehicle-part.service';

describe('VehiclePartService', () => {
  let service: VehiclePartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclePartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
