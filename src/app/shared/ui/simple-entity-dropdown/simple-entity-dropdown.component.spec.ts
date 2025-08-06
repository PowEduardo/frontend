import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleEntityDropdownComponent } from './simple-entity-dropdown.component';

describe('SimpleEntityDropdownComponent', () => {
  let component: SimpleEntityDropdownComponent;
  let fixture: ComponentFixture<SimpleEntityDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleEntityDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleEntityDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
