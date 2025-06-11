import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclePartTableComponent } from './vehicle-part-table.component';

describe('VehiclePartTableComponent', () => {
  let component: VehiclePartTableComponent;
  let fixture: ComponentFixture<VehiclePartTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclePartTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehiclePartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
