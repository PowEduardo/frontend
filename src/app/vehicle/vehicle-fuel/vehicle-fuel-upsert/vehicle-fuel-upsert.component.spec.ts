import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFuelUpsertComponent } from './vehicle-fuel-upsert.component';

describe('VehicleFuelUpsertComponent', () => {
  let component: VehicleFuelUpsertComponent;
  let fixture: ComponentFixture<VehicleFuelUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleFuelUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleFuelUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
