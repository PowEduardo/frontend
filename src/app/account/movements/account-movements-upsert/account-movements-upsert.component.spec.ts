import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMovementsUpsertComponent } from './account-movements-upsert.component';

describe('AccountMovementsUpsertComponent', () => {
  let component: AccountMovementsUpsertComponent;
  let fixture: ComponentFixture<AccountMovementsUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountMovementsUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountMovementsUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
