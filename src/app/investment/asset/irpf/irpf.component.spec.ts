import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrpfComponent } from './irpf.component';

describe('IrpfComponent', () => {
  let component: IrpfComponent;
  let fixture: ComponentFixture<IrpfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IrpfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IrpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
