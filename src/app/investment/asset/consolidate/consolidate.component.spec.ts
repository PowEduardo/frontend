import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidateComponent } from './consolidate.component';

describe('ConsolidateComponent', () => {
  let component: ConsolidateComponent;
  let fixture: ComponentFixture<ConsolidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsolidateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsolidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
