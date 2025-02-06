import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementUpsertComponent } from './statement-upsert.component';

describe('StatementUpsertComponent', () => {
  let component: StatementUpsertComponent;
  let fixture: ComponentFixture<StatementUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatementUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
