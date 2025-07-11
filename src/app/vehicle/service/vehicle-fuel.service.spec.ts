import { TestBed } from '@angular/core/testing';

import { VehicleFuelService } from './vehicle-fuel.service';

describe('VehicleFuelService', () => {
  let service: VehicleFuelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleFuelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
