import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFuelComponent } from './vehicle-fuel.component';

describe('VehicleFuelComponent', () => {
  let component: VehicleFuelComponent;
  let fixture: ComponentFixture<VehicleFuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleFuelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleFuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
