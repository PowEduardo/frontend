import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementUpsertComponent } from './movement-upsert.component';

describe('MovementUpsertComponent', () => {
  let component: MovementUpsertComponent;
  let fixture: ComponentFixture<MovementUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovementUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovementUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
