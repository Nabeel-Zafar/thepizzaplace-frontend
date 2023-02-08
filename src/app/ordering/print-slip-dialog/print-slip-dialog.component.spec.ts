import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSlipDialogComponent } from './print-slip-dialog.component';

describe('PrintSlipDialogComponent', () => {
  let component: PrintSlipDialogComponent;
  let fixture: ComponentFixture<PrintSlipDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintSlipDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintSlipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
