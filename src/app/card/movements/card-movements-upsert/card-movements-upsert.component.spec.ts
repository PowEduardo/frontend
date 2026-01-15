import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMovementsUpsertComponent } from './card-movements-upsert.component';

describe('CardMovementsUpsertComponent', () => {
  let component: CardMovementsUpsertComponent;
  let fixture: ComponentFixture<CardMovementsUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMovementsUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardMovementsUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
