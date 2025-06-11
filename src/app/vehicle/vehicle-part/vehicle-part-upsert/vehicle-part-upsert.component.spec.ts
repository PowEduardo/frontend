import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclePartUpsertComponent } from './vehicle-part-upsert.component';

describe('VehiclePartUpsertComponent', () => {
  let component: VehiclePartUpsertComponent;
  let fixture: ComponentFixture<VehiclePartUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclePartUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehiclePartUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
