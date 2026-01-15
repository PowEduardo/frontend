import { TestBed } from '@angular/core/testing';

import { CardMovementService } from './card-movement.service';

describe('CardMovementServiceService', () => {
  let service: CardMovementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardMovementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
