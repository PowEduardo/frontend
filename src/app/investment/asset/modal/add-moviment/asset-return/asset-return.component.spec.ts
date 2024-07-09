import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetReturnMovementUpsertComponent } from './asset-return.component';

describe('AddReturnComponent', () => {
  let component: AssetReturnMovementUpsertComponent;
  let fixture: ComponentFixture<AssetReturnMovementUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetReturnMovementUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetReturnMovementUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
