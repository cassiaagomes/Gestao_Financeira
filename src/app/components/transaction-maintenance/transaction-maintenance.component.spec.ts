import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionMaintenanceComponent } from './transaction-maintenance.component';

describe('TransactionMaintenanceComponent', () => {
  let component: TransactionMaintenanceComponent;
  let fixture: ComponentFixture<TransactionMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionMaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
