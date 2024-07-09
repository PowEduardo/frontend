import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMovementUpsertComponent } from './asset-movement-upsert.component';

describe('AssetMovimentComponent', () => {
  let component: AssetMovementUpsertComponent;
  let fixture: ComponentFixture<AssetMovementUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetMovementUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetMovementUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
