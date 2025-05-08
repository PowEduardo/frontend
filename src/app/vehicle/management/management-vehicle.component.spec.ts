import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementVehiclesComponent } from './management-vehicle.component';

describe('ManagementComponent', () => {
  let component: ManagementVehiclesComponent;
  let fixture: ComponentFixture<ManagementVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementVehiclesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagementVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
