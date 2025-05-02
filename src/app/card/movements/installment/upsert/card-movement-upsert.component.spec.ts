import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMovementUpsertComponent } from './card-movement-upsert.component';

describe('UpsertComponent', () => {
  let component: CardMovementUpsertComponent;
  let fixture: ComponentFixture<CardMovementUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMovementUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardMovementUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
