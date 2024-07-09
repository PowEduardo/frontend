import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTypeDetailsComponent } from './asset-type-details.component';

describe('AssetTableComponent', () => {
  let component: AssetTypeDetailsComponent;
  let fixture: ComponentFixture<AssetTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetTypeDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssetTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
