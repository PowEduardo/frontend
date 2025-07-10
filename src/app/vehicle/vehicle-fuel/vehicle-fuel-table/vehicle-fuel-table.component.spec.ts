import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFuelTableComponent } from './vehicle-fuel-table.component';

describe('VehicleFuelTableComponent', () => {
  let component: VehicleFuelTableComponent;
  let fixture: ComponentFixture<VehicleFuelTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleFuelTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleFuelTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
