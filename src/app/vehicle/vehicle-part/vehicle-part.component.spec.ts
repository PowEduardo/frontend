import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclePartComponent } from './vehicle-part.component';

describe('VehiclePartComponent', () => {
  let component: VehiclePartComponent;
  let fixture: ComponentFixture<VehiclePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclePartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehiclePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
